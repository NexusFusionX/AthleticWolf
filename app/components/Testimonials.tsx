"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";
import { Star } from "@phosphor-icons/react";

const categories = [
  { id: "fat-loss", label: "Fat Loss" },
  { id: "muscle", label: "Muscle Building" },
  { id: "recomp", label: "Body Recomposition" },
  { id: "general", label: "General Fitness" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const reviews: Record<
  CategoryId,
  { name: string; quote: string; result: string }[]
> = {
  "fat-loss": [
    {
      name: "Sarah M.",
      quote:
        "I finally stopped yo-yo dieting. The plan fit my schedule and the weekly check-ins kept me honest.",
      result: "Lost 14 lbs in 10 weeks",
    },
    {
      name: "James K.",
      quote:
        "Clear nutrition targets and workouts I could do at home. No guesswork — just follow the plan.",
      result: "Down 2 dress sizes",
    },
  ],
  muscle: [
    {
      name: "Alex R.",
      quote:
        "Progressive overload was built in from day one. I broke through a plateau I'd been stuck on for months.",
      result: "Added 8 lbs lean mass",
    },
    {
      name: "Omar H.",
      quote:
        "Programming matched my gym setup perfectly. Form cues and plan updates made a huge difference.",
      result: "Bench +40 lbs in 12 weeks",
    },
  ],
  recomp: [
    {
      name: "Priya S.",
      quote:
        "I looked leaner and stronger at the same time. The balance of training and macros was spot on.",
      result: "Visible recomposition in 8 weeks",
    },
  ],
  general: [
    {
      name: "Daniel T.",
      quote:
        "As a beginner I needed structure. Having a real coach in my corner changed everything.",
      result: "Consistent 4×/week training",
    },
  ],
};

export function Testimonials() {
  const [active, setActive] = useState<CategoryId>("fat-loss");
  const items = reviews[active];

  return (
    <section
      id="testimonials"
      className="section-y wheel-section section-surface px-6 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="fade">
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <AccentHeading
            accent="Client"
            after="Reviews"
            className="font-display text-center text-2xl tracking-wide sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted sm:text-base">
            Real feedback organized by goal — fat loss, muscle building, and more.
          </p>
        </Reveal>

        <Reveal delay={0.08} variant="up">
          <div
            className="mt-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Review categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                onClick={() => setActive(cat.id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors sm:text-sm ${
                  active === cat.id
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-card text-muted hover:border-accent/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={`${active}-${item.name}`} delay={i * 0.06} variant="rise">
              <article className="testimonial-card h-full rounded-2xl border border-line bg-card p-6">
                <div className="flex gap-1 text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} weight="fill" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-sm font-bold text-white">{item.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.result}
                  </p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
