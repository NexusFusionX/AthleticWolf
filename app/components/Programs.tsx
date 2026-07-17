"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { programs } from "../data/programs";

export function Programs() {
  return (
    <section id="programs" className="wheel-section px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl">
            COACHING PROGRAMS
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.06}>
              <Link
                href={`/programs/${program.slug}`}
                className="card-premium block overflow-hidden rounded-xl border border-line bg-card transition-all hover:-translate-y-1.5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={program.src}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold uppercase leading-tight">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {program.desc}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
