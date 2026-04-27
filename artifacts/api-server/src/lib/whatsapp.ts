import { logger } from "./logger";

const ADMIN_PHONE = "923105605600";

export async function sendWhatsAppNotification(message: string): Promise<void> {
  const apiKey = process.env.CALLMEBOT_APIKEY;

  // Agar API Key nahi hai, toh ye function kuch nahi karega (Safe mode)
  if (!apiKey) {
    logger.warn("WhatsApp notification skipped — No API Key");
    return;
  }

  const encoded = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encoded}&apikey=${apiKey}`;

  try {
    // Sirf aik hi fetch call hogi, aur wo bhi sahi tareeqe se
    const response = await fetch(url);
    
    if (!response.ok) {
       logger.warn("WhatsApp notification failed");
    } else {
       logger.info("WhatsApp notification sent successfully");
    }
  } catch (err) {
    logger.warn({ err }, "WhatsApp notification error");
  }
}
