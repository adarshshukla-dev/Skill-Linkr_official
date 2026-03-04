import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Subscriber } from "@/models/subscriber";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

// --- SECURITY FIX: ENSURE ENVIRONMENT VARIABLES ARE SET ---

// Throw an error if the JWT secret is not defined
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}
const JWT_SECRET = process.env.JWT_SECRET;

// Throw an error if email credentials are not set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing email credentials. Please define EMAIL_USER and EMAIL_PASS in your .env.local file.");
}

// --- SECURE CONFIGURATION: Create the transporter with no fallbacks ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Uses your secure variable
    pass: process.env.EMAIL_PASS, // Uses your secure variable
  },
});

export async function POST(request: Request) {
  try {
    // --- BUG FIX: Corrected cookie parsing syntax ---
    const token = cookies().get("admin-token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    // Verify admin token
    try {
      const decoded = verify(token, JWT_SECRET);
      if (typeof decoded !== "object" || !decoded.email) { // More robust check
        throw new Error("Invalid token payload");
      }
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }

    const { imageUrl, subject, heading, description, category, websiteUrl, recipients } = await request.json();

    await connectToDatabase();

    // Determine recipient list
    let subscriberEmails: string[] = [];
    if (recipients.type === "all") {
      const subscribers = await Subscriber.find({ active: true }).select('email');
      subscriberEmails = subscribers.map((sub) => sub.email);
    } else if (recipients.type === "selected" && Array.isArray(recipients.emails)) {
      subscriberEmails = recipients.emails;
    } else if (recipients.type === "single" && recipients.email) {
      subscriberEmails = [recipients.email];
    } else {
      return NextResponse.json({ success: false, message: "Invalid recipients format" }, { status: 400 });
    }

    if (subscriberEmails.length === 0) {
      return NextResponse.json({ success: false, message: "No recipients selected" }, { status: 400 });
    }

    // --- HTML Email Template ---
    const emailHtml = `... (your beautiful HTML email template remains the same) ...`;


    // Send emails in parallel
    const results = await Promise.allSettled(
      subscriberEmails.map(async (email: string) => {
        const mailOptions = {
          // --- FIX: Use the environment variable for the 'from' address ---
          from: `"E-Cell MIT Meerut" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: subject,
          html: emailHtml.replace(/\[email\]/g, encodeURIComponent(email)),
        };
        return transporter.sendMail(mailOptions);
      })
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - successful;

    return NextResponse.json({
      success: true,
      message: `Emails sent: ${successful} successful, ${failed} failed`,
      successful,
      failed,
    });

  } catch (error) {
    console.error("Error in send-email API:", error);
    return NextResponse.json({ success: false, message: "An error occurred while sending emails" }, { status: 500 });
  }
}
