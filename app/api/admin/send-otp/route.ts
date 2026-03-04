import { NextResponse } from "next/server";
import { generateOTP, sendOTP, saveOTP } from "@/lib/otp";

const allowedAdmins = [
  "ecell@mitmeerut.ac.in",
];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    console.log("➡️ Received email:", email);

    // Validate admin email
    if (!allowedAdmins.includes(email.trim().toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "Invalid admin email" },
        { status: 403 }
      );
    }

    const otp = generateOTP(email);
    console.log("Generated OTP:", otp);

    saveOTP(email, otp); // ✅ Await added for OTP save

    const sent = await sendOTP(email, otp);

    if (sent) {
      return NextResponse.json({ success: true, message: "OTP sent successfully" });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in send-otp API:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while sending OTP" },
      { status: 500 }
    );
  }
}
