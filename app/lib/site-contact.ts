export const SITE_CONTACT = {
  email: "hello@athleticwolf.com",
  instagramUrl: "https://instagram.com/athletic_wolf7",
  instagramHandle: "@athletic_wolf7",
  whatsappNumber: "923217771554",
  whatsappDisplay: "+92 321 7771554",
  whatsappMessage:
    "Hi Athletic Wolf, I'd like to learn more about online coaching.",
} as const;

export function getWhatsAppUrl() {
  const text = encodeURIComponent(SITE_CONTACT.whatsappMessage);
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${text}`;
}
