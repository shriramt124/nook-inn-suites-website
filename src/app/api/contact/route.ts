import { NextRequest, NextResponse } from "next/server";
import { sendMail, emailWrapper, fieldRow, fieldsTable, HOTEL_EMAIL } from "../../../lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const fields = fieldsTable(
      fieldRow("Guest Name", name) +
      fieldRow("Email", email) +
      fieldRow("Phone", phone) +
      fieldRow("Subject", subject)
    );

    const html = emailWrapper(
      "New Contact Inquiry",
      `
      <p style="color:#444;font-size:15px;margin-bottom:24px;">
        A new contact inquiry has been submitted through the Nook Inn &amp; Suites website.
      </p>
      ${fields}
      <div style="margin-top:24px;background:#f9f9f9;border-left:4px solid #e11d35;padding:16px 20px;">
        <p style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Message</p>
        <p style="color:#111;font-size:14px;margin:0;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
      </div>
      <p style="margin-top:28px;color:#666;font-size:12px;">
        Please reply directly to <a href="mailto:${email}" style="color:#e11d35;">${email}</a> to respond to this inquiry.
      </p>
      `
    );

    await sendMail({
      to: HOTEL_EMAIL,
      subject: `[Contact Inquiry] ${subject} — from ${name}`,
      html,
    });

    // Send auto-reply to guest
    const guestHtml = emailWrapper(
      "We Received Your Message",
      `
      <p style="color:#444;font-size:15px;line-height:1.7;">
        Dear <strong>${name}</strong>,<br/><br/>
        Thank you for reaching out to <strong>Nook Inn &amp; Suites</strong>. We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.
      </p>
      <div style="margin:24px 0;background:#f9f9f9;border-left:4px solid #e11d35;padding:16px 20px;">
        <p style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Your Message</p>
        <p style="color:#111;font-size:14px;margin:0;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
      </div>
      <p style="color:#666;font-size:13px;">
        In the meantime, you can call us or WhatsApp us for immediate assistance.
      </p>
      `
    );

    await sendMail({
      to: email,
      subject: "We received your inquiry — Nook Inn & Suites",
      html: guestHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
