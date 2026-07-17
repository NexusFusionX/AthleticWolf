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
        <Reveal className="max-w-xl">
          <h2 className="font-display text-center text-4xl sm:text-5xl">
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
          <div className="lg:hidden">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-accent">
                        <Icon size={24} weight="regular" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="font-display text-sm font-bold uppercase tracking-wider">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">{step.desc}</p>
                      </div>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="flex h-10 w-16 shrink-0 items-center justify-center text-accent">
                        <ArrowDown size={20} weight="bold" />
                      </div>
                    )}
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
