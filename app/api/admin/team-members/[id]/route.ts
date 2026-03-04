import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
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

// Update team member
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    try {
      const decoded = verify(token, JWT_SECRET)
      if (typeof decoded !== "object" || decoded.email !== "ecell@mitmeerut.ac.in") {
        throw new Error("Invalid token")
      }
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    const { name, role } = await request.json()

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 })
    }

    // Connect to the database
    await connectToDatabase()

    // Find and update the team member
    const teamMember = await TeamMember.findById(params.id)

    if (!teamMember) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 })
    }

    // Update fields
    teamMember.name = name
    teamMember.role = role || teamMember.role

    await teamMember.save()

    // If role was changed to Admin, send notification email
    if (role === "Admin" && teamMember.role !== "Admin") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      const adminLoginUrl = `${siteUrl}/admin/login`

      const mailOptions = {
        from: process.env.EMAIL_FROM || "adevraj934@gmail.com",
        to: teamMember.email,
        subject: "You've been promoted to Admin at E-Cell MIT",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #2563eb; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">E-Cell MIT</h1>
              <p style="color: white; margin-top: 5px;">Meerut Institute of Technology</p>
            </div>
            
            <div style="padding: 20px;">
              <h2>Congratulations on Your Promotion!</h2>
              <p>Dear ${teamMember.name},</p>
              <p>You have been promoted to <strong>Admin</strong> role in the E-Cell MIT team.</p>
              
              <p>As an admin, you now have access to the admin dashboard where you can:</p>
              <ul>
                <li>Manage team members</li>
                <li>Assign tasks</li>
                <li>Send newsletters</li>
                <li>View subscriber data</li>
              </ul>
              
              <p>To access the admin dashboard, please click the button below:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${adminLoginUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Access Admin Dashboard</a>
              </div>
              
              <p>You can log in using your email address: ${teamMember.email}</p>
              
              <p>If you have any questions, please contact the main admin.</p>
              
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
      message: "Team member updated successfully",
      teamMember,
    })
  } catch (error) {
    console.error("Error in update team member API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while updating team member" },
      { status: 500 },
    )
  }
}

// Delete team member
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    try {
      const decoded = verify(token, JWT_SECRET)
      if (typeof decoded === "object" && "email" in decoded && decoded.email !== "ecell@mitmeerut.ac.in") {
        throw new Error("Invalid token")
      }
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    // Connect to the database
    await connectToDatabase()

    // Find the team member
    const teamMember = await TeamMember.findById(params.id)

    if (!teamMember) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 })
    }

    // Delete the team member
    await TeamMember.findByIdAndDelete(params.id)

    // Send notification email
    const mailOptions = {
      from: process.env.EMAIL_FROM || "adevraj934@gmail.com",
      to: teamMember.email,
      subject: "Your E-Cell MIT Team Access Has Been Removed",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">E-Cell MIT</h1>
            <p style="color: white; margin-top: 5px;">Meerut Institute of Technology</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Team Access Removed</h2>
            <p>Dear ${teamMember.name},</p>
            <p>This is to inform you that your access to the E-Cell MIT team has been removed.</p>
            
            <p>If you believe this is an error or have any questions, please contact the admin.</p>
            
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

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully",
    })
  } catch (error) {
    console.error("Error in delete team member API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while deleting team member" },
      { status: 500 },
    )
  }
}
