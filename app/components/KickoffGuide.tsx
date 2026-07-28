"use client";

import Link from "next/link";
import {
  ClipboardText,
  CreditCard,
  FileText,
  ChatsCircle,
  Trophy,
} from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";

const steps = [
  {
    icon: ClipboardText,
    step: "01",
    title: "Complete Your Assessment",
    desc: "Tell us your goals, schedule, equipment, and experience so your coach has the full picture.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Choose Package & Checkout",
    desc: "Pick Silver, Platinum, or Diamond and secure your coaching spot online.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Coach Builds Your Plan",
    desc: "Your ISSA-certified coach reviews your assessment and builds your custom program.",
  },
  {
    icon: ChatsCircle,
    step: "04",
    title: "Kick-Off & Check-Ins",
    desc: "Get your plan, start training, and check in weekly for adjustments and accountability.",
  },
  {
    icon: Trophy,
    step: "05",
    title: "Track Real Progress",
    desc: "Plans evolve with you — updates based on results, feedback, and how life actually goes.",
  },
];

export function KickoffGuide() {
  return (
    <section
      id="our-process"
      className="section-y wheel-section px-6 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal variant="fade">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Kick-Off Guide
          </p>
          <AccentHeading
            before="How"
            accent="Our Process"
            after="Works"
            className="font-display mt-3 text-center text-3xl sm:text-4xl lg:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            From first click to your first workout — here&apos;s exactly what happens
            after you join.
          </p>
        </Reveal>

        <ol className="kickoff-steps mt-14">
          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={i * 0.07} variant="left">
                <li className="kickoff-step">
                  <div className="kickoff-step__marker">
                    <span className="kickoff-step__num">{item.step}</span>
                    <div className="kickoff-step__icon">
                      <Icon size={24} weight="regular" aria-hidden />
                    </div>
                  </div>
                  <div className="kickoff-step__body">
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.2} variant="up">
          <div className="mt-12 text-center">
            <Link
              href="/auth/login?redirect=%2Fquiz%3Fstart%3D1"
              className="btn btn-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Start Your Assessment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
