"use client";

import { Headset, LockSimple } from "@phosphor-icons/react";

const ASSURANCE_BADGES = [
  {
    icon: Headset,
    title: "Coach follow-up",
    description: "Your coach reaches out within 24 hours after checkout.",
  },
  {
    icon: LockSimple,
    title: "Secure checkout",
    description: "Card details are encrypted and processed by Stripe.",
  },
] as const;

export function CheckoutTrustBadges() {
  return (
    <div className="checkout-trust-wrap">
      <ul className="checkout-trust-assurance">
        {ASSURANCE_BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <li key={badge.title} className="checkout-trust-assurance__card">
              <span className="checkout-trust-assurance__icon" aria-hidden>
                <Icon size={20} weight="duotone" />
              </span>
              <div className="checkout-trust-assurance__copy">
                <p className="checkout-trust-assurance__title">{badge.title}</p>
                <p className="checkout-trust-assurance__text">{badge.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
