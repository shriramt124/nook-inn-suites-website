import { NextRequest, NextResponse } from "next/server";
import { sendMail, emailWrapper, fieldRow, fieldsTable, HOTEL_EMAIL } from "../../../lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, intent } = body;

    if (!name || !email || !phone || !intent) {
      return NextResponse.json({ error: "Name, email, phone and intent are required." }, { status: 400 });
    }

    const fields = fieldsTable(
      fieldRow("Name", name) +
      fieldRow("Email", email) +
      fieldRow("Phone", phone) +
      fieldRow("City", city || "Not specified") +
      fieldRow("Interested In", intent)
    );

    const html = emailWrapper(
      "New Callback Request",
      `
      <p style="color:#444;font-size:15px;margin-bottom:24px;">
        A callback request has been submitted on the Nook Inn &amp; Suites website.
      </p>
      ${fields}
      <div style="margin-top:24px;padding:16px 20px;background:#fff4f5;border:1px solid #fecdd5;border-radius:4px;">
        <p style="color:#e11d35;font-size:13px;margin:0;font-weight:600;">
          ⚡ Please call <a href="tel:${phone}" style="color:#e11d35;">${phone}</a> at the earliest to follow up on this lead.
        </p>
      </div>
      `
    );

    await sendMail({
      to: HOTEL_EMAIL,
      subject: `[Callback Request] ${intent} — ${name} (${phone})`,
      html,
    });

    // Auto-reply to the guest
    const guestHtml = emailWrapper(
      "Callback Confirmed",
      `
      <p style="color:#444;font-size:15px;line-height:1.7;">
        Dear <strong>${name}</strong>,<br/><br/>
        Thank you for your interest in <strong>${intent}</strong> at <strong>Nook Inn &amp; Suites</strong>.<br/><br/>
        Our team will call you at <strong>${phone}</strong> within a few hours to discuss further.
      </p>
      ${fieldsTable(
        fieldRow("Your Name", name) +
        fieldRow("Contact Number", phone) +
        fieldRow("Enquiry For", intent) +
        (city ? fieldRow("City", city) : "")
      )}
      <p style="color:#666;font-size:13px;margin-top:24px;">
        If you need immediate assistance, feel free to reply to this email.
      </p>
      `
    );

    await sendMail({
      to: email,
      subject: "Your callback request received — Nook Inn & Suites",
      html: guestHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Callback email error:", error);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
