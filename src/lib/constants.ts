export const FALLBACK_WA_NUMBER = "6281111111111";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WA_NUMBER;
}
