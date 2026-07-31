import {
  ShieldCheck,
  CheckCircle,
  Clock,
  GlobeHemisphereWest,
  CalendarCheck,
} from "@phosphor-icons/react/dist/ssr";

export const HERO_TRUST_BADGES = [
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
] as const;

export function HeroTrustBadgeItem({
  badge,
  compact = false,
}: {
  badge: (typeof HERO_TRUST_BADGES)[number];
  compact?: boolean;
}) {
  const Icon = badge.icon;

  return (
    <div className="flex flex-col items-center gap-2.5 text-center sm:gap-3">
      <div
        className={`flex items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-accent ${
          compact
            ? "h-10 w-10"
            : "h-11 w-11 sm:h-12 sm:w-12"
        }`}
      >
        <Icon size={compact ? 20 : 22} weight="regular" />
      </div>
      <p
        className={`font-display font-bold leading-none tracking-wide text-white ${
          compact
            ? "text-sm"
            : "text-base sm:text-xl"
        }`}
      >
        {badge.heading}
      </p>
      <p
        className={`max-w-[9.5rem] font-semibold uppercase leading-snug tracking-wider text-white/65 ${
          compact ? "text-[9px]" : "text-[10px] sm:text-xs"
        }`}
      >
        {badge.label}
      </p>
    </div>
  );
}

export function HeroTrustBadgesRow({
  compact = false,
  limit,
  className = "",
}: {
  compact?: boolean;
  limit?: number;
  className?: string;
}) {
  const items = limit ? HERO_TRUST_BADGES.slice(0, limit) : HERO_TRUST_BADGES;

  return (
    <div
      className={`grid grid-cols-3 gap-3 ${className}`.trim()}
    >
      {items.map((badge) => (
        <HeroTrustBadgeItem key={badge.heading} badge={badge} compact={compact} />
      ))}
    </div>
  );
}
