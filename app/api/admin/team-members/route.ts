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

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    try {
      // Allow both admin emails
      const decoded = verify(token, JWT_SECRET)
      if (typeof decoded !== "string" && decoded.email !== "ecell@mitmeerut.ac.in") {
        throw new Error("Invalid token")
      }
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    // Connect to the database
    await connectToDatabase()

    // Get query parameters
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query
    const query: any = {}
    if (search) {
      query.$or = [{ email: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }]
    }

    // Get team members
    const teamMembers = await TeamMember.find(query).sort({ addedAt: -1 }).skip(skip).limit(limit)

    // Get total count for pagination
    const total = await TeamMember.countDocuments(query)

    return NextResponse.json({
      success: true,
      teamMembers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error in team-members API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching team members" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    try {
      // Allow both admin emails
      const decoded = verify(token, JWT_SECRET)
      if (typeof decoded !== "string" && decoded.email !== "ecell@mitmeerut.ac.in") {
        throw new Error("Invalid token")
      }
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    const { email, name, role, position } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ success: false, message: "Email and name are required fields" }, { status: 400 })
    }

    // Connect to the database
    await connectToDatabase()

    // Check if team member already exists
    const existingMember = await TeamMember.findOne({ email })
    if (existingMember) {
      return NextResponse.json(
        { success: false, message: "A team member with this email already exists" },
        { status: 409 },
      )
    }

    // Create new team member
    const newTeamMember = new TeamMember({
      email,
      name,
      role: role || "Member",
      position: position || "",
    })

    await newTeamMember.save()

    // Send invitation email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const loginUrl = `${siteUrl}/team/login?email=${encodeURIComponent(email)}`

    const mailOptions = {
      from: process.env.EMAIL_FROM || "adevraj934@gmail.com",
      to: email,
      subject: "You've been invited to join E-Cell MIT Team",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">E-Cell MIT</h1>
            <p style="color: white; margin-top: 5px;">Meerut Institute of Technology</p>
          </div>
          
          <div style="padding: 20px;">
            <h2>Welcome to the E-Cell Team!</h2>
            <p>Dear ${name},</p>
            <p>You have been added as a team member to the E-Cell MIT team with the role of <strong>${role || "Member"}</strong>${
              position ? ` and position of <strong>${position}</strong>` : ""
            }.</p>
            
            <p>To access your team dashboard, please click the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Access Team Dashboard</a>
            </div>
            
            <p>You will receive an OTP on this email address when you try to log in.</p>
            
            <p>If you have any questions, please contact the admin.</p>
            
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
      message: "Team member added successfully",
      teamMember: newTeamMember,
    })
  } catch (error) {
    console.error("Error in add team member API:", error)
    return NextResponse.json({ success: false, message: "An error occurred while adding team member" }, { status: 500 })
  }
}
