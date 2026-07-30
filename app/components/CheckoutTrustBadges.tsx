"use client";

import Link from "next/link";
import { Headset, ShieldCheck, Timer } from "@phosphor-icons/react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Refund policy",
    description: (
      <>
        Review our{" "}
        <Link href="/refund" className="text-accent hover:text-accent-light">
          refund terms
        </Link>{" "}
        before you pay.
      </>
    ),
  },
  {
    icon: Headset,
    title: "Coach follow-up",
    description: "Your coach reaches out within 24 hours after checkout.",
  },
  {
    icon: Timer,
    title: "Secure checkout",
    description: "Card details are encrypted and processed by Stripe.",
  },
] as const;

export function CheckoutTrustBadges() {
  return (
    <ul className="checkout-trust">
      {BADGES.map((badge) => {
        const Icon = badge.icon;
        return (
          <li key={badge.title} className="checkout-trust__item">
            <span className="checkout-trust__icon" aria-hidden>
              <Icon size={18} weight="duotone" />
            </span>
            <div>
              <p className="checkout-trust__title">{badge.title}</p>
              <p className="checkout-trust__text">{badge.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
