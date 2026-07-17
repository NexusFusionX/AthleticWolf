"use client";

import { ClipboardText, Phone, FileText, User, Trophy, ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: ClipboardText,
    title: "APPLY",
    desc: "Fill out the application",
  },
  {
    icon: Phone,
    title: "CONSULTATION CALL",
    desc: "We discuss your goals",
  },
  {
    icon: FileText,
    title: "PERSONALIZED PLAN",
    desc: "Get a custom plan tailored to your needs",
  },
  {
    icon: User,
    title: "WEEKLY COACHING",
    desc: "Weekly check-ins, reviews & support",
  },
  {
    icon: Trophy,
    title: "ACHIEVE RESULTS",
    desc: "Transform your body and your life",
  },
];

export function HowCoachingWorks() {
  return (
    <section id="how-it-works" className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl lg:text-5xl">
            HOW COACHING WORKS
          </h2>
        </Reveal>

        <div className="mt-16">
          {/* Desktop flow */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                      <Icon size={32} weight="regular" />
                    </div>

                    {i < steps.length - 1 && (
                      <div className="absolute left-full top-10 flex w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-accent">
                        <ArrowRight size={20} weight="bold" />
                      </div>
                    )}

                    <p className="font-display mt-4 text-sm font-bold uppercase tracking-wider">
                      {step.title}
                    </p>
                    <p className="mt-2 max-w-[140px] text-center text-xs text-muted">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile flow */}
          <div className="mx-auto max-w-sm lg:hidden">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4">
                    <div className="flex h-full flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-card text-accent">
                        <Icon size={18} weight="light" />
                      </div>
                      {!isLast && (
                        <div className="relative flex flex-1 items-center justify-center py-1">
                          <div className="absolute inset-y-0 w-px bg-line" aria-hidden />
                          <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-paper">
                            <ArrowDown size={14} weight="bold" className="text-accent" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`flex flex-col justify-center ${isLast ? "" : "pb-5"}`}>
                      <p className="font-display text-xs font-bold uppercase tracking-wider">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
