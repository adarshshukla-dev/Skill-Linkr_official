import { type NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Subscriber } from "@/models/subscriber";
import nodemailer from "nodemailer";

// SMTP Transporter Configuration
// Note: secure: true for 465, false for 587
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === "465", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // 1. Basic Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 }
      );
    }

    // 2. Connect to Database
    await connectToDatabase();

    // 3. Check if already exists
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "This email is already subscribed!" },
        { status: 409 }
      );
    }

    // 4. Save New Subscriber
    const newSubscriber = new Subscriber({ email: email.toLowerCase() });
    await newSubscriber.save();

    console.log("✅ Subscriber saved to MongoDB:", email);

    // 5. Send Confirmation Email
    // Hum ise try-catch mein rakhenge taaki agar email fail bhi ho, 
    // toh user ko DB mein save hone ka error na dikhe.
    try {
      await sendConfirmationEmail(email);
      console.log("✅ Confirmation email sent to:", email);
    } catch (mailError) {
      console.error("❌ Nodemailer Error:", mailError);
      // Email fail hone par hum user ko inform nahi karenge kyunki woh DB mein save ho chuka hai
    }

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing!" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("🔥 API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(email: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

  const mailOptions = {
    from: `"E-Cell MIT Meerut" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to E-Cell MIT Newsletter! 🚀",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2563eb; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">E-Cell MIT</h1>
          <p style="color: #bfdbfe; margin-top: 5px;">Empowering Innovation</p>
        </div>
        
        <div style="padding: 30px; color: #374151; line-height: 1.6;">
          <h2 style="color: #111827;">Thank You for Subscribing!</h2>
          <p>Hi there,</p>
          <p>We're thrilled to have you join the <strong>E-Cell MIT</strong> community. You'll now be the first to know about our latest events, startup workshops, and innovation challenges.</p>
          
          <div style="background-color: #f3f4f6; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #1e40af;">What to expect:</p>
            <ul style="margin-top: 10px; padding-left: 20px;">
              <li>Exclusive Startup Mentorship</li>
              <li>Hackathons & Competitions</li>
              <li>Industry Networking Events</li>
            </ul>
          </div>
          
          <p>Follow us to stay updated:</p>
          <div style="margin: 20px 0; text-align: center;">
            <a href="https://www.linkedin.com/in/ecell-mitmeerut/" style="display: inline-block; padding: 10px 20px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">LinkedIn</a>
            <a href="https://www.instagram.com/ecell_mitmeerut" style="display: inline-block; padding: 10px 20px; background-color: #e1306c; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">Instagram</a>
          </div>
          
          <p style="font-size: 13px; color: #6b7280; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            If you didn't subscribe to this list, you can <a href="${unsubscribeUrl}" style="color: #2563eb;">unsubscribe here</a>.
          </p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
