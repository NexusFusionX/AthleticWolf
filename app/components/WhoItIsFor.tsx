"use client";

import {
  Briefcase,
  Lightbulb,
  Scales,
  Barbell,
  TrendUp,
  Heart,
} from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const categories = [
  {
    icon: Briefcase,
    title: "Busy Professionals",
  },
  {
    icon: Lightbulb,
    title: "Beginners",
  },
  {
    icon: Scales,
    title: "Weight Loss Clients",
  },
  {
    icon: Barbell,
    title: "Muscle Building Enthusiasts",
  },
  {
    icon: TrendUp,
    title: "Weight Gain",
  },
  {
    icon: Heart,
    title: "Anyone Struggling with Consistency",
  },
];

export function WhoItIsFor() {
  return (
    <section className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl lg:text-5xl">
            WHO THIS IS FOR
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted sm:text-base">
            Built for real people with real schedules — not gym influencers.
          </p>
        </Reveal>

        <div className="process-grid mt-14">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.title} delay={i * 0.06}>
                <article className="process-card group h-full">
                  <span
                    className="process-card-top-line"
                    aria-hidden
                  />
                  <span
                    className="process-card-glow"
                    aria-hidden
                  />

                  <div className="process-icon-showcase">
                    <div className="process-icon-frame">
                      <Icon size={44} weight="regular" className="text-accent" />
                    </div>
                  </div>

                  <h3 className="process-card-title">{category.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
