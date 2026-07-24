import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
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

function ProgramRow({
  program,
  delay = 0,
}: {
  program: (typeof programs)[number];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/programs/${program.slug}`}
        className="card-premium group grid grid-cols-[minmax(112px,40%)_1fr] overflow-hidden rounded-2xl border border-line bg-card"
      >
        <div className="relative min-h-[148px] w-full overflow-hidden">
          <Image
            src={program.src}
            alt={program.title}
            fill
            className="object-cover"
            sizes="40vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-2.5 p-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide">
            {program.title}
          </h3>
          <p className="text-xs leading-relaxed text-muted">{program.desc}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            Learn More
            <ArrowRight size={14} weight="bold" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

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

        {/* Mobile: horizontal image + text rows */}
        <div className="mt-10 flex flex-col gap-5 sm:hidden">
          {programs.map((program, i) => (
            <ProgramRow key={program.slug} program={program} delay={i * 0.05} />
          ))}
        </div>

        {/* Desktop: previous card grid */}
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
