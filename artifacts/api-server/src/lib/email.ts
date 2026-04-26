import nodemailer from "nodemailer";
import { logger } from "./logger";

export async function sendContactNotification(contact: {
  name: string;
  phone: string;
  pickupLocation: string;
  message: string;
}): Promise<void> {
  const user = process.env.NOTIFY_EMAIL;
  const pass = process.env.NOTIFY_EMAIL_PASSWORD;

  if (!user || !pass) {
    logger.warn("NOTIFY_EMAIL or NOTIFY_EMAIL_PASSWORD not set — email notification skipped");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const lines = [
    `You have received a new contact request on your MTS Transport website.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Name:            ${contact.name}`,
    `Phone:           ${contact.phone}`,
    contact.pickupLocation ? `Pickup Location: ${contact.pickupLocation}` : null,
    contact.message ? `Message:         ${contact.message}` : null,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `You can view and manage all requests in your admin panel.`,
  ].filter(Boolean).join("\n");

  const htmlLines = [
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">`,
    `<div style="background:#DC143C;padding:20px 24px;">`,
    `<h2 style="color:white;margin:0;font-size:20px;">🚌 New Contact Request — MTS Transport</h2>`,
    `</div>`,
    `<div style="padding:24px;background:#fff;">`,
    `<table style="width:100%;border-collapse:collapse;">`,
    `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${contact.name}</td></tr>`,
    `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Phone</td><td style="padding:8px 0;font-weight:600;color:#111;">${contact.phone}</td></tr>`,
    contact.pickupLocation ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Pickup Location</td><td style="padding:8px 0;color:#111;">${contact.pickupLocation}</td></tr>` : "",
    contact.message ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;vertical-align:top;">Message</td><td style="padding:8px 0;color:#111;">${contact.message}</td></tr>` : "",
    `</table>`,
    `<div style="margin-top:20px;padding:12px 16px;background:#fef2f2;border-left:4px solid #DC143C;border-radius:4px;">`,
    `<p style="margin:0;color:#374151;font-size:14px;">Call this customer back on <strong>${contact.phone}</strong> to confirm their booking.</p>`,
    `</div>`,
    `</div>`,
    `<div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">`,
    `<p style="margin:0;color:#9ca3af;font-size:12px;">Sent automatically by MTS Transport Service website</p>`,
    `</div>`,
    `</div>`,
  ].filter(Boolean).join("\n");

  try {
    await transporter.sendMail({
      from: `"MTS Transport Service" <${user}>`,
      to: user,
      subject: `📋 New Contact Request from ${contact.name} — MTS Transport`,
      text: lines,
      html: htmlLines,
    });
    logger.info({ to: user }, "Contact notification email sent");
  } catch (err) {
    logger.warn({ err }, "Failed to send contact notification email");
  }
}
