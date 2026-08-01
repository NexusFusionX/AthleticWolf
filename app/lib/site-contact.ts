export const SITE_CONTACT = {
  email: "hello@athleticwolf.com",
  instagramUrl: "https://instagram.com/athletic_wolf7",
  instagramHandle: "@athletic_wolf7",
  whatsappNumber: "923217771554",
  whatsappDisplay: "+92 321 7771554",
  whatsappMessage:
    "Hi Athletic Wolf, I'd like to learn more about online coaching.",
} as const;

/** Update hrefs here if any social handle changes. */
export const SITE_SOCIAL_LINKS = [
  {
    platform: "youtube",
    href: "https://www.youtube.com/@AthleticWolf",
    label: "YouTube",
  },
  {
    platform: "instagram",
    href: SITE_CONTACT.instagramUrl,
    label: "Instagram",
  },
  {
    platform: "tiktok",
    href: "https://www.tiktok.com/@athletic_wolf7",
    label: "TikTok",
  },
  {
    platform: "snapchat",
    href: "https://www.snapchat.com/add/athletic_wolf7",
    label: "Snapchat",
  },
  {
    platform: "facebook",
    href: "https://www.facebook.com/athleticwolf7",
    label: "Facebook",
  },
] as const;

export type SiteSocialPlatform = (typeof SITE_SOCIAL_LINKS)[number]["platform"];

export type FooterContactIconId = "email" | "whatsapp" | SiteSocialPlatform;

export type FooterContactIconLink = {
  id: FooterContactIconId;
  href: string;
  label: string;
  external: boolean;
};

export function getFooterContactIcons(): FooterContactIconLink[] {
  return [
    {
      id: "email",
      href: `mailto:${SITE_CONTACT.email}`,
      label: `Email ${SITE_CONTACT.email}`,
      external: false,
    },
    {
      id: "whatsapp",
      href: getWhatsAppUrl(),
      label: `WhatsApp ${SITE_CONTACT.whatsappDisplay}`,
      external: true,
    },
    ...SITE_SOCIAL_LINKS.map((social) => ({
      id: social.platform,
      href: social.href,
      label: social.label,
      external: true,
    })),
  ];
}

export function getWhatsAppUrl() {
  const text = encodeURIComponent(SITE_CONTACT.whatsappMessage);
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${text}`;
}
