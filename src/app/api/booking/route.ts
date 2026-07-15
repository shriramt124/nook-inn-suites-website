import { NextRequest, NextResponse } from "next/server";
import { sendMail, emailWrapper, fieldRow, fieldsTable, HOTEL_EMAIL } from "../../../lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingId,
      guestName,
      email,
      phone,
      country,
      roomName,
      checkIn,
      checkOut,
      adults,
      children,
      numberOfRooms,
      specialRequests,
      couponCode,
      pricing,
    } = body;

    if (!guestName || !email || !phone || !roomName || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Required booking fields missing." }, { status: 400 });
    }

    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

    // ── Hotel notification email ────────────────────────────────────────────
    const hotelFields = fieldsTable(
      fieldRow("Booking ID", bookingId) +
      fieldRow("Guest Name", guestName) +
      fieldRow("Email", email) +
      fieldRow("Phone", phone) +
      fieldRow("Country", country) +
      fieldRow("Room Type", roomName) +
      fieldRow("Check-In", formatDate(checkIn)) +
      fieldRow("Check-Out", formatDate(checkOut)) +
      fieldRow("Nights", `${pricing.nights} night(s)`) +
      fieldRow("Adults", String(adults)) +
      fieldRow("Children", String(children)) +
      fieldRow("Number of Rooms", String(numberOfRooms)) +
      (couponCode ? fieldRow("Coupon Code", couponCode) : "") +
      (specialRequests ? fieldRow("Special Requests", specialRequests) : "")
    );

    const pricingBlock = `
    <div style="margin-top:24px;background:#f9f9f9;border:1px solid #e5e5e5;padding:20px;">
      <p style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Pricing Breakdown</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="color:#444;font-size:13px;padding:4px 0;">Rate / Night</td><td align="right" style="color:#111;font-size:13px;">₹${pricing.ratePerNight?.toLocaleString("en-IN")} (${adults} adult${adults > 1 ? "s" : ""}${children > 0 ? `, ${children} child${children > 1 ? "ren" : ""}` : ""})</td></tr>
        <tr><td style="color:#444;font-size:13px;padding:4px 0;">Subtotal (${pricing.nights} night${pricing.nights !== 1 ? "s" : ""} × ${numberOfRooms} room${Number(numberOfRooms) > 1 ? "s" : ""})</td><td align="right" style="color:#111;font-size:13px;">₹${pricing.baseTotal?.toLocaleString("en-IN")}</td></tr>
        ${pricing.discount > 0 ? `<tr><td style="color:#e11d35;font-size:13px;padding:4px 0;">Discount</td><td align="right" style="color:#e11d35;font-size:13px;">-₹${pricing.discount?.toLocaleString("en-IN")}</td></tr>` : ""}
        <tr><td style="color:#444;font-size:13px;padding:4px 0;">Taxes (12%)</td><td align="right" style="color:#111;font-size:13px;">₹${pricing.taxes?.toLocaleString("en-IN")}</td></tr>
        <tr><td colspan="2"><hr style="border:none;border-top:1px solid #e5e5e5;margin:8px 0;" /></td></tr>
        <tr><td style="color:#111;font-size:15px;font-weight:700;padding:4px 0;">Grand Total</td><td align="right" style="color:#e11d35;font-size:16px;font-weight:700;">₹${pricing.grandTotal?.toLocaleString("en-IN")}</td></tr>
      </table>
    </div>`;

    const hotelHtml = emailWrapper(
      "New Reservation Received",
      `
      <p style="color:#444;font-size:15px;margin-bottom:24px;">
        A new room booking has been submitted on the Nook Inn &amp; Suites website.
      </p>
      ${hotelFields}
      ${pricingBlock}
      <div style="margin-top:20px;padding:14px 18px;background:#fff4f5;border:1px solid #fecdd5;">
        <p style="color:#e11d35;font-size:13px;margin:0;font-weight:600;">
          Please confirm this reservation and contact the guest at 
          <a href="tel:${phone}" style="color:#e11d35;">${phone}</a> if needed.
        </p>
      </div>
      `
    );

    await sendMail({
      to: HOTEL_EMAIL,
      subject: `[New Booking] ${bookingId} — ${guestName} · ${roomName}`,
      html: hotelHtml,
    });

    // ── Guest confirmation email ────────────────────────────────────────────
    const guestFields = fieldsTable(
      fieldRow("Booking Reference", bookingId) +
      fieldRow("Room", roomName) +
      fieldRow("Check-In", formatDate(checkIn)) +
      fieldRow("Check-Out", formatDate(checkOut)) +
      fieldRow("Duration", `${pricing.nights} Night(s)`) +
      fieldRow("Adults", String(adults)) +
      fieldRow("Children", String(children)) +
      fieldRow("Rooms Booked", String(numberOfRooms))
    );

    const guestHtml = emailWrapper(
      "Reservation Confirmed! 🎉",
      `
      <p style="color:#444;font-size:15px;line-height:1.7;">
        Dear <strong>${guestName}</strong>,<br/><br/>
        Your reservation at <strong>Nook Inn &amp; Suites, Gurugram</strong> has been successfully received. 
        Our team will confirm your booking within a few hours.
      </p>
      ${guestFields}
      ${pricingBlock}
      <div style="margin-top:24px;background:#f0fdf4;border:1px solid #bbf7d0;padding:16px 20px;">
        <p style="color:#166534;font-size:13px;margin:0;">
          ✅ <strong>Check-in time is 12:00 PM.</strong> Please carry a valid photo ID at check-in.
          If you need to make any changes, reply to this email or call us directly.
        </p>
      </div>
      ${specialRequests ? `<div style="margin-top:16px;background:#f9f9f9;border-left:4px solid #e11d35;padding:12px 16px;"><p style="color:#999;font-size:11px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Your Special Requests</p><p style="color:#111;font-size:14px;margin:0;">${specialRequests}</p></div>` : ""}
      <p style="color:#666;font-size:12px;margin-top:24px;">
        We look forward to welcoming you!<br/>
        <strong>Team Nook Inn &amp; Suites</strong>
      </p>
      `
    );

    await sendMail({
      to: email,
      subject: `Booking Confirmed: ${bookingId} — Nook Inn & Suites`,
      html: guestHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json({ error: "Failed to send confirmation email." }, { status: 500 });
  }
}
