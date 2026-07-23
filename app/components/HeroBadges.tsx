import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Headset,
  Target,
} from "@phosphor-icons/react/dist/ssr";

const badges = [
  { icon: ShieldCheck, title: "ISSA Certified Coach" },
  { icon: CheckCircle, title: "Personalized Plans" },
  { icon: Clock, title: "Weekly Check-ins" },
  { icon: Headset, title: "24/7 Support" },
  { icon: Target, title: "Evidence-Based Coaching" },
];

export function HeroBadges() {
  const mobileBadges = badges.slice(0, 3);

  return (
    <section className="border-y border-line px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: top 3 only, no carousel */}
        <div className="grid grid-cols-3 gap-4 sm:hidden">
          {mobileBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={24} weight="regular" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {badge.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Desktop: all 5 in a row */}
        <div className="hidden sm:grid sm:grid-cols-5 sm:gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={24} weight="regular" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {badge.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
