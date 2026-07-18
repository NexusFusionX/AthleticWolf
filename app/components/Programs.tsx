"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { programs } from "../data/programs";

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  return (
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
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 90vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-sm font-bold uppercase leading-tight">
          {program.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">{program.desc}</p>
      </div>
    </Link>
  );
}

export function Programs() {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goTo(index: number) {
    setActive(Math.max(0, Math.min(programs.length - 1, index)));
  }

  function handleScroll() {
    if (isProgrammaticScroll.current) return;
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const itemWidth = scroller.children[0]?.clientWidth || 1;
      const index = Math.round(scroller.scrollLeft / itemWidth);
      setActive(Math.max(0, Math.min(programs.length - 1, index)));
    }, 100);
  }

  useEffect(() => {
    const scroller = scrollerRef.current;
    const item = scroller?.children[active] as HTMLElement | undefined;
    if (!scroller || !item) return;

    isProgrammaticScroll.current = true;
    scroller.scrollTo({ left: item.offsetLeft, behavior: "smooth" });

    const clearFlag = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
    return () => clearTimeout(clearFlag);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % programs.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="programs" className="wheel-section px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl">
            COACHING PROGRAMS
          </h2>
        </Reveal>

        {/* Mobile: one card at a time, arrows + dots below */}
        <div className="mt-10 sm:hidden">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {programs.map((program) => (
              <div key={program.slug} className="w-full shrink-0 snap-start px-1">
                <ProgramCard program={program} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo((active - 1 + programs.length) % programs.length)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-foreground"
              aria-label="Previous program"
            >
              <CaretLeft size={16} weight="bold" />
            </button>

            <div className="flex items-center gap-2">
              {programs.map((program, i) => (
                <button
                  key={program.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${program.title}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-accent" : "w-2 bg-line"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo((active + 1) % programs.length)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-foreground"
              aria-label="Next program"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Desktop: full grid */}
        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.06}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
