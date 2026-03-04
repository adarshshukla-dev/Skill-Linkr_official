// lib/otp.ts

import nodemailer from "nodemailer";

// This is the shared, in-memory store for OTPs.
export const otpStore: { [key: string]: { otp: string; expiry: number } } = {};

// Throw an error if email credentials are not set in the environment
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing email credentials. Please define EMAIL_USER and EMAIL_PASS in your .env.local file.");
}

// Nodemailer transporter configured securely
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // No fallback
    pass: process.env.EMAIL_PASS, // No fallback
  },
});

// Generate a 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email
export async function sendOTP(email: string, otp: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"E-Cell MIT Meerut" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your E-Cell Login Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #2563eb;">E-Cell Login Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent successfully to", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    return false;
  }
}

// Save OTP
export function saveOTP(email: string, otp: string) {
  otpStore[email] = {
    otp,
    expiry: Date.now() + 10 * 60 * 1000, // 10 minutes
  };
}

// Verify OTP
export function verifyOTP(email: string, otp: string): boolean {
  const stored = otpStore[email];
  if (stored && stored.otp === otp && Date.now() < stored.expiry) {
    delete otpStore[email]; // Use OTP only once
    return true;
  }
  return false;
}
