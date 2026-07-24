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

function BadgeItem({
  badge,
}: {
  badge: (typeof badges)[number];
}) {
  const Icon = badge.icon;

  return (
    <div className="flex flex-col items-center gap-2.5 px-2 py-1 text-center sm:gap-3 sm:px-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/20 sm:h-12 sm:w-12">
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

function BadgesPanel({
  items,
  columnsClass,
}: {
  items: typeof badges;
  columnsClass: string;
}) {
  return (
    <div className="[perspective:900px]">
      <div className="group relative overflow-hidden rounded-2xl border border-line bg-card/90 shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-[transform,box-shadow,border-color] duration-500 ease-out will-change-transform hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_44px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,107,53,0.12)] hover:rotate-x-[1.5deg]">
        {/* Full-width top bar: expands from center on panel hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 origin-center scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
        <div className={`grid divide-x divide-white/10 px-2 py-6 sm:px-3 sm:py-8 ${columnsClass}`}>
          {items.map((badge) => (
            <BadgeItem key={badge.heading} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroBadges() {
  return (
    <section className="px-6 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="sm:hidden">
          <BadgesPanel items={badges.slice(0, 3)} columnsClass="grid-cols-3" />
        </div>
        <div className="hidden sm:block">
          <BadgesPanel items={badges} columnsClass="grid-cols-5" />
        </div>
      </div>
    </section>
  );
}
