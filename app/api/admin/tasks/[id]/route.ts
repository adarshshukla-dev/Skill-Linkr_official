import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { Task } from "@/models/task"
import { TeamMember } from "@/models/team-member"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import nodemailer from "nodemailer"

const JWT_SECRET = process.env.JWT_SECRET || "ecell-admin-secret-key"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER || "adevraj934@gmail.com",
    pass: process.env.EMAIL_PASS || "gsau jbco rvrg rppe",
  },
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get token from cookies
    const token = (await cookies()).get("admin-token")?.value || (await cookies()).get("team-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    // Verify token
    let decoded
    try {
      decoded = verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    const { status } = await request.json()

    if (!status || !["pending", "process", "complete", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Valid status is required (pending, process, complete, rejected)" },
        { status: 400 },
      )
    }

    // Connect to the database
    await connectToDatabase()

    // Check if task exists
    const task = await Task.findById(params.id)
    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    // If team member token, check if task is assigned to them
    if (
      (await cookies()).get("team-token")?.value &&
      typeof decoded !== "string" &&
      decoded.email !== task.assignedTo
    ) {
      return NextResponse.json(
        { success: false, message: "You can only update tasks assigned to you" },
        { status: 403 },
      )
    }

    // Update task status
    const oldStatus = task.status
    task.status = status
    task.updatedAt = new Date()

    await task.save()

    // Send notification email to admin if status changed by team member
    if ((await cookies()).get("team-token")?.value && oldStatus !== status) {
      const teamMember = await TeamMember.findOne({ email: typeof decoded !== "string" ? decoded.email : undefined })

      const mailOptions = {
        from: process.env.EMAIL_FROM || "adevraj934@gmail.com",
        to: "ecell@mitmeerut.ac.in", // Admin email
        subject: `Task Status Updated: ${task.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #2563eb; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">E-Cell MIT</h1>
              <p style="color: white; margin-top: 5px;">Meerut Institute of Technology</p>
            </div>
              <p>${teamMember?.name || (typeof decoded !== "string" ? decoded.email : "Unknown")} has updated the status of a task:</p>
            <div style="padding: 20px;">
              <h2>Task Status Updated</h2>
              <p>Hello Admin,</p>
              <p>${teamMember?.name || (typeof decoded !== "string" ? decoded.email : "Unknown")} has updated the status of a task:</p>
              
              <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <h3 style="margin-top: 0;">${task.title}</h3>
                <p><strong>Previous Status:</strong> ${oldStatus}</p>
                <p><strong>New Status:</strong> ${status}</p>
                <p><strong>Updated At:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p>You can view the task details in the admin dashboard.</p>
              
              <p>Best regards,<br>E-Cell Team<br>Meerut Institute of Technology</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>This is an automated email from E-Cell MIT. Please do not reply to this email.</p>
              <p>E-Cell, Meerut Institute of Technology, NH-58, Delhi-Roorkee Highway, Meerut, Uttar Pradesh - 250005</p>
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
    }

    return NextResponse.json({
      success: true,
      message: "Task status updated successfully",
      task,
    })
  } catch (error) {
    console.error("Error in update task status API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while updating task status" },
      { status: 500 },
    )
  }
}
