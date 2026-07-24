import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Headset,
  Target,
} from "@phosphor-icons/react/dist/ssr";

const badges = [
  {
    icon: ShieldCheck,
    heading: "Certified",
    label: "ISSA Certified Coach",
  },
  {
    icon: CheckCircle,
    heading: "Personal",
    label: "Personalized Plans",
  },
  {
    icon: Clock,
    heading: "Weekly",
    label: "Check-ins Included",
  },
  {
    icon: Headset,
    heading: "24/7",
    label: "Coach Support",
  },
  {
    icon: Target,
    heading: "Proven",
    label: "Evidence-Based Coaching",
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
    <section className="border-y border-line px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: top 3 only */}
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {mobileBadges.map((badge) => (
            <BadgeItem key={badge.heading} badge={badge} />
          ))}
        </div>

        {/* Desktop: all 5 */}
        <div className="hidden grid-cols-5 gap-6 sm:grid">
          {badges.map((badge) => (
            <BadgeItem key={badge.heading} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
