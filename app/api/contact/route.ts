import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. ADMIN EMAIL: Stylish Lead Notification
    await transporter.sendMail({
      from: `"E-Cell Lead System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Inquiry: ${subject} from ${name}`,
      html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          <div style="background-color: #0047ab; padding: 25px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">New Lead Captured</h2>
          </div>
          <div style="padding: 40px; color: #333333;">
            <p style="font-size: 16px; line-height: 1.6;">You have received a new message from the <strong>E-Cell MIT Meerut</strong> contact form.</p>
            <div style="margin: 30px 0; border-left: 4px solid #0047ab; padding-left: 20px;">
              <p style="margin: 10px 0;"><strong>Sender:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0; font-weight: bold; color: #0047ab; margin-bottom: 10px;">Message Body:</p>
              <p style="margin: 0; line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, "<br/>")}</p>
            </div>
            <div style="margin-top: 40px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #0047ab; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Quick Reply to Sender</a>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #eeeeee;">
            Automated Notification from E-Cell Internal System
          </div>
        </div>
      </div>
      `,
    });

    // 2. USER EMAIL: Premium Startup Confirmation
    await transporter.sendMail({
      from: `"E-Cell MIT Meerut" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've got your message, ${name}!`,
      html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 20px; color: #1a1a1a;">
        <table style="max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 16px; overflow: hidden; border-spacing: 0;">
          <tr>
            <td style="background-color: #0047ab; padding: 40px; text-align: center;">
              <img src="https://res.cloudinary.com/dp2olwtzp/image/upload/v1745418700/ecell_logo_white_bg_remove_uhnwaz.png" alt="E-Cell Logo" height="60" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h1 style="font-size: 26px; margin-top: 0; color: #111827;">Thanks for reaching out, ${name}! </h1>
              <p style="font-size: 17px; line-height: 1.7; color: #4b5563;">
                We've received your inquiry about <strong>"${subject}"</strong>. Our team is currently reviewing it and will get back to you within the next 24-48 business hours.
              </p>
              <div style="margin: 35px 0; padding: 25px; background-color: #f0f7ff; border-radius: 12px; text-align: center;">
                <p style="margin: 0; color: #0047ab; font-weight: 600;">While you wait, why not explore our latest startup resources?</p>
                <div style="margin-top: 20px;">
                  <a href="https://ecell.mitmuf.com" style="background-color: #0047ab; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Visit Website</a>
                </div>
              </div>
              <p style="font-size: 15px; color: #6b7280; margin-bottom: 0;">Best regards,</p>
              <p style="font-size: 16px; font-weight: bold; color: #111827; margin-top: 5px;">The E-Cell Team</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #f0f0f0;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #9ca3af; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Stay Connected</p>
              <div style="margin-bottom: 20px;">
                <a href="https://www.linkedin.com/in/ecell-mitmeerut/" style="margin: 0 10px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" height="24"></a>
                <a href="https://www.instagram.com/ecell_mitmeerut" style="margin: 0 10px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" height="24"></a>
              </div>
              <p style="font-size: 12px; color: #bdc3c7; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} E-Cell, Meerut Institute of Technology.<br/>
                NH-58, Delhi-Roorkee Highway, Meerut, UP 250103
              </p>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
