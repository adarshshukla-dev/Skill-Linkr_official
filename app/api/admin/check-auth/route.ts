import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import connectToDatabase from "@/lib/mongoose"
import { TeamMember } from "@/models/team-member"

const JWT_SECRET = process.env.JWT_SECRET || "ecell-admin-secret-key"

export async function GET() {
  try {
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    try {
      const decoded = verify(token, JWT_SECRET)
      const email = typeof decoded !== "string" && "email" in decoded ? decoded.email as string : null

      // Check if this is the main admin
      if (email === "ecell@mitmeerut.ac.in") {
        return NextResponse.json({
          authenticated: true,
          isMainAdmin: true,
          adminInfo: {
            email: "ecell@mitmeerut.ac.in",
            name: "E-Cell Admin",
            role: "Super Admin",
          },
        })
      }

      // Connect to database to check if this is a team member with admin privileges
      await connectToDatabase()
      const teamMember = await TeamMember.findOne({ email, active: true, isAdmin: true })

      if (teamMember) {
        return NextResponse.json({
          authenticated: true,
          isMainAdmin: false,
          adminInfo: {
            email: teamMember.email,
            name: teamMember.name,
            role: teamMember.role,
            id: teamMember._id,
          },
        })
      }
    } catch (error) {
      // Token verification failed
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error("Error checking authentication:", error)
    return NextResponse.json({ authenticated: false })
  }
}
