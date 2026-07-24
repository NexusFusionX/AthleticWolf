import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { programs } from "../data/programs";

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
        className="card-premium group grid grid-cols-[minmax(112px,40%)_1fr] overflow-hidden rounded-2xl border border-line bg-card transition-all"
      >
        <div className="relative min-h-[148px] w-full overflow-hidden sm:min-h-[180px] lg:min-h-[200px]">
          <Image
            src={program.src}
            alt={program.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 280px, 40vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-2.5 p-4 sm:gap-3 sm:p-6 lg:p-7">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide sm:text-lg">
            {program.title}
          </h3>
          <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
            {program.desc}
          </p>
          <span className="mt-1 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-colors group-hover:text-accent-light sm:text-xs">
            Learn More
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Programs() {
  return (
    <section id="programs" className="wheel-section px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <Reveal>
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <h2 className="font-display text-center text-2xl tracking-wide sm:text-4xl">
            COACHING PROGRAMS
          </h2>
        </Reveal>

        {/* Stacked horizontal rows — each program is its own separated card */}
        <div className="mt-10 flex flex-col gap-5 sm:gap-6">
          {programs.map((program, i) => (
            <ProgramRow key={program.slug} program={program} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
