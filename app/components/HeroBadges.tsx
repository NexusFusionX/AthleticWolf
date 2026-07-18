"use client";

import { useRef, useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Headset,
  Target,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

const badges = [
  { icon: ShieldCheck, title: "ISSA Certified Coach" },
  { icon: CheckCircle, title: "Personalized Plans" },
  { icon: Clock, title: "Weekly Check-ins" },
  { icon: Headset, title: "24/7 Support" },
  { icon: Target, title: "Evidence-Based Coaching" },
];

export function HeroBadges() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(badges.length - 1, index));
    setActive(clamped);
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const item = scroller.children[clamped] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const itemWidth = scroller.children[0]?.clientWidth || 1;
    const index = Math.round(scroller.scrollLeft / itemWidth);
    setActive(Math.max(0, Math.min(badges.length - 1, index)));
  }

  return (
    <section className="border-y border-line px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: one badge centered at a time, arrows + dots below */}
        <div className="sm:hidden">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="flex w-full shrink-0 snap-start flex-col items-center gap-3 py-2 text-center"
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

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-opacity disabled:opacity-30"
              aria-label="Previous"
            >
              <CaretLeft size={16} weight="bold" />
            </button>

            <div className="flex items-center gap-2">
              {badges.map((badge, i) => (
                <button
                  key={badge.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${badge.title}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-accent" : "w-2 bg-white/25"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === badges.length - 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-opacity disabled:opacity-30"
              aria-label="Next"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
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
