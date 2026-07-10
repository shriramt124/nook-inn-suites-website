import nodemailer from "nodemailer";

// ── Transporter (Gmail SMTP via App Password) ─────────────────────────────────
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const HOTEL_EMAIL = process.env.GMAIL_USER as string;
export const HOTEL_NAME = "Nook Inn & Suites";

// ── Shared email wrapper ───────────────────────────────────────────────────────
export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"${HOTEL_NAME}" <${HOTEL_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}

// ── Common email layout wrapper ───────────────────────────────────────────────
export function emailWrapper(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:28px 40px;text-align:center;">
              <div style="display:inline-block;background:#e11d35;color:#fff;font-size:10px;letter-spacing:3px;text-transform:uppercase;padding:6px 16px;margin-bottom:12px;">Nook Inn &amp; Suites</div>
              <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0;letter-spacing:2px;">${title}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:20px 40px;text-align:center;">
              <p style="color:#666;font-size:11px;margin:0;letter-spacing:1px;text-transform:uppercase;">
                Nook Inn &amp; Suites · Gurugram, NCR · shriramt.124@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Field row helper ──────────────────────────────────────────────────────────
export function fieldRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
      <span style="color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${label}</span><br/>
      <span style="color:#111;font-size:14px;font-weight:500;">${value || "—"}</span>
    </td>
  </tr>`;
}

export function fieldsTable(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}
