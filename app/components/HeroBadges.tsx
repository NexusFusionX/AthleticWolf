"use client";

import {
  ShieldCheck,
  CheckCircle,
  Clock,
  GlobeHemisphereWest,
  CalendarCheck,
} from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const badges = [
  {
    icon: ShieldCheck,
    heading: "ISSA",
    label: "Certified Coach",
  },
  {
    icon: CheckCircle,
    heading: "100%",
    label: "Personalized Plans",
  },
  {
    icon: Clock,
    heading: "Weekly",
    label: "Check-ins Included",
  },
  {
    icon: CalendarCheck,
    heading: "6-Month",
    label: "Coaching Programs",
  },
  {
    icon: GlobeHemisphereWest,
    heading: "Worldwide",
    label: "Online Coaching",
  },
];

function BadgeItem({ badge }: { badge: (typeof badges)[number] }) {
  const Icon = badge.icon;

  return (
    <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-accent sm:h-12 sm:w-12">
        <Icon size={22} weight="regular" />
      </div>
      <p className="font-display text-base font-bold leading-none tracking-wide text-white sm:text-xl">
        {badge.heading}
      </p>
      <p className="max-w-[9.5rem] text-[10px] font-semibold uppercase leading-snug tracking-wider text-white/65 sm:text-xs">
        {badge.label}
      </p>
    </div>
  );
}

export function HeroBadges() {
  const mobileBadges = badges.slice(0, 3);

  return (
    <section className="border-y border-line bg-card/30 px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {mobileBadges.map((badge, i) => (
            <Reveal key={badge.heading} delay={i * 0.07} variant="pop">
              <BadgeItem badge={badge} />
            </Reveal>
          ))}
        </div>

        <div className="hidden grid-cols-5 gap-6 sm:grid">
          {badges.map((badge, i) => (
            <Reveal key={badge.heading} delay={i * 0.06} variant="pop">
              <BadgeItem badge={badge} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
