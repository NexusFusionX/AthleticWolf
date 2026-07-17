import type { Icon } from "@phosphor-icons/react";

type Badge = { icon: Icon; title: string };

export function HeroBadges({ badges }: { badges: Badge[] }) {
  return (
    <section className="border-y border-line px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: 3 visible, swipe/scroll for the rest */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-1 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex w-1/3 shrink-0 snap-start flex-col items-center gap-3 text-center"
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
