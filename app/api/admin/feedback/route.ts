export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { Feedback } from "@/models/feedback"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "ecell-admin-secret-key"

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const token = (await cookies()).get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    try {
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
      query.email = { $regex: search, $options: "i" }
    }

    // Get feedback
    const feedback = await Feedback.find(query).sort({ submittedAt: -1 }).skip(skip).limit(limit)

    // Get total count for pagination
    const total = await Feedback.countDocuments(query)

    return NextResponse.json({
      success: true,
      feedback,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error in feedback API:", error)
    return NextResponse.json({ success: false, message: "An error occurred while fetching feedback" }, { status: 500 })
  }
}
