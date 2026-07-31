import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  Barbell,
  ChatCircle,
  Clock,
  CreditCard,
  GlobeHemisphereWest,
  Headset,
  Package,
  Question,
  ShieldCheck,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";

export type TrustHighlightItem = {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  href?: string;
};

export const DEFAULT_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "Refund policy",
    description: "Clear terms before you commit.",
    href: "/refund",
  },
  {
    icon: Headset,
    title: "Coach follow-up",
    description: "We reach out within 24 hours after checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Payments encrypted and processed by Stripe.",
  },
];

export const PACKAGES_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: Package,
    title: "Three coaching tiers",
    description: "Silver, Platinum, and Diamond — pick the support level that fits.",
  },
  {
    icon: Headset,
    title: "Coach follow-up",
    description: "We reach out within 24 hours after checkout.",
  },
  {
    icon: CreditCard,
    title: "Secure checkout",
    description: "Payments encrypted and processed by Stripe.",
  },
];

export const HOW_IT_WORKS_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: Package,
    title: "Pick a plan & pay",
    description: "Choose your package and checkout in minutes.",
  },
  {
    icon: UserCircle,
    title: "Complete assessment",
    description: "A short intake so your coach knows your goals and schedule.",
  },
  {
    icon: Barbell,
    title: "Train with your plan",
    description: "Custom workouts, nutrition, and check-ins from day one.",
  },
];

export const ABOUT_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "ISSA certified",
    description: "Professional coaching backed by recognized certification.",
  },
  {
    icon: Clock,
    title: "10+ years experience",
    description: "Training, nutrition, and accountability built over a decade.",
  },
  {
    icon: GlobeHemisphereWest,
    title: "Worldwide coaching",
    description: "Online programs for clients anywhere in the world.",
  },
];

export const FAQ_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: Question,
    title: "Quick answers",
    description: "Browse common questions or ask our AI assistant anytime.",
  },
  {
    icon: Headset,
    title: "Coach support",
    description: "Still stuck? Reach out and we will help you directly.",
  },
  {
    icon: ShieldCheck,
    title: "Clear policies",
    description: "Refund, privacy, and terms written in plain language.",
    href: "/refund",
  },
];

export const PRIVACY_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "Data protected",
    description: "Your personal information is handled with care and security.",
  },
  {
    icon: UserCircle,
    title: "You stay in control",
    description: "We only collect what we need to deliver your coaching.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    description: "Billing is processed safely through Stripe.",
  },
];

export const REFUND_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "Clear refund terms",
    description: "Know exactly what is covered before you commit.",
  },
  {
    icon: Headset,
    title: "Coach follow-up",
    description: "We reach out within 24 hours after checkout.",
  },
  {
    icon: ChatCircle,
    title: "Questions welcome",
    description: "Contact us anytime if you need clarification.",
    href: "/faq",
  },
];

export const TERMS_TRUST_HIGHLIGHTS: TrustHighlightItem[] = [
  {
    icon: ShieldCheck,
    title: "Transparent terms",
    description: "Straightforward policies for coaching and billing.",
  },
  {
    icon: CreditCard,
    title: "Secure billing",
    description: "Monthly coaching packages billed safely through Stripe.",
  },
  {
    icon: Headset,
    title: "Real support",
    description: "Coach follow-up and help when you need it.",
  },
];

export function programTrustHighlights(programTitle: string): TrustHighlightItem[] {
  return [
    {
      icon: Barbell,
      title: "Built for your goal",
      description: `${programTitle} programming tailored to you — not a template.`,
    },
    {
      icon: Headset,
      title: "Coach follow-up",
      description: "We reach out within 24 hours after checkout.",
    },
    {
      icon: Package,
      title: "Included in packages",
      description: "Every coaching tier includes personalized plan delivery.",
      href: "/packages",
    },
  ];
}

export function packageTrustHighlights(
  packageName: string,
  tagline: string
): TrustHighlightItem[] {
  return [
    {
      icon: Package,
      title: `${packageName} coaching`,
      description: tagline,
    },
    {
      icon: Headset,
      title: "Coach follow-up",
      description: "We reach out within 24 hours after checkout.",
    },
    {
      icon: CreditCard,
      title: "Secure checkout",
      description: "Payments encrypted and processed by Stripe.",
    },
  ];
}

/** Pages that render their own strip above the footer. */
export const CUSTOM_TRUST_STRIP_PATHS = new Set([
  "/packages",
  "/how-it-works",
  "/about",
  "/faq",
  "/privacy",
  "/refund",
  "/terms",
]);

export function pathHasCustomTrustStrip(pathname: string): boolean {
  if (CUSTOM_TRUST_STRIP_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/programs/")) return true;
  if (pathname.startsWith("/packages/")) return true;
  return false;
}
