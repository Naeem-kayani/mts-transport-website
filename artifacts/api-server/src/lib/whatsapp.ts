import { logger } from "./logger";

const ADMIN_PHONE = "923105605600";

export async function sendWhatsAppNotification(message: string): Promise<void> {
  const apiKey = process.env.CALLMEBOT_APIKEY;

  if (!apiKey) {
    logger.warn("CALLMEBOT_APIKEY not set — WhatsApp notification skipped");
    return;
  }

  const encoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encoded}&apikey=${apiKey}`;

  try {
    const response = (await fetch(url)) as any;
    if (!response.ok) {
      const body = await response.text();
      logger.warn({ status: response.status, body }, "WhatsApp notification failed");
    } else {
      logger.info("WhatsApp notification sent successfully");
    }
  } catch (err) {
    logger.warn({ err }, "WhatsApp notification error — continuing without notification");
  }
}
