import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Clear the admin token cookie
    (await cookies()).delete("admin-token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging out:", error)
    return NextResponse.json({ success: false, message: "An error occurred while logging out" }, { status: 500 })
  }
}
