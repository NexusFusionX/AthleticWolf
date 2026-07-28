import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { revealAt, type RevealVariant } from "../lib/reveal";
import { AccentHeading } from "./AccentHeading";
import { programs } from "../data/programs";

type Program = (typeof programs)[number];

function ProgramTitle({ program }: { program: Program }) {
  return (
    <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-wide">
      {program.titleBefore ? (
        <span className="text-white">{program.titleBefore} </span>
      ) : null}
      <span className="text-accent">{program.titleAccent}</span>
      {program.titleAfter ? (
        <span className="text-white"> {program.titleAfter}</span>
      ) : null}
    </h3>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="program-card card-premium group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card"
    >
      <span className="card-topline" aria-hidden />
      <span className="card-corner-glow" aria-hidden />

      <div className="program-card__media relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={program.src}
          alt={program.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 90vw"
        />
        <span className="program-card__media-fade" aria-hidden />
      </div>

      <div className="program-card__body flex flex-1 flex-col p-4">
        <ProgramTitle program={program} />
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{program.desc}</p>
        <span className="program-card__chip mt-4 inline-flex w-fit items-center gap-1.5">
          Learn More
          <ArrowRight size={12} weight="bold" aria-hidden />
        </span>
      </div>

      <p className="program-card__footer">{program.outcome}</p>
    </Link>
  );
}

const PROGRAM_CARD_VARIANTS = [
  "tilt-left",
  "flip-up",
  "tilt-right",
  "zoom",
  "rise",
] as const;

function ProgramRow({
  program,
  delay = 0,
  variant = "up",
}: {
  program: Program;
  delay?: number;
  variant?: RevealVariant;
}) {
  return (
    <Reveal delay={delay} variant={variant}>
      <Link
        href={`/programs/${program.slug}`}
        className="program-card program-card--row card-premium group block overflow-hidden rounded-2xl border border-line bg-card"
      >
        <span className="card-topline" aria-hidden />
        <span className="card-corner-glow" aria-hidden />

        <div className="program-card__row grid grid-cols-[118px_1fr] items-stretch">
          <div className="program-card__media program-card__media--portrait relative min-h-[158px] overflow-hidden">
            <Image
              src={program.src}
              alt={program.title}
              fill
              className="object-cover object-center"
              sizes="118px"
            />
          </div>

          <div className="flex flex-col justify-center gap-2 p-4">
            <ProgramTitle program={program} />
            <p className="text-xs leading-relaxed text-muted">{program.desc}</p>
            <p className="text-[11px] font-semibold leading-snug text-accent-bright">
              {program.outcome}
            </p>
            <span className="program-card__chip mt-1 inline-flex w-fit items-center gap-1.5">
              Learn More
              <ArrowRight size={12} weight="bold" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Programs() {
  return (
    <section id="programs" className="section-y wheel-section px-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="drop">
          <div className="mx-auto mb-4 h-px w-10 bg-accent" />
          <AccentHeading
            accent="COACHING"
            after="PROGRAMS"
            className="font-display text-center text-2xl tracking-wide sm:text-4xl"
          />
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {programs.map((program, i) => (
            <ProgramRow
              key={program.slug}
              program={program}
              delay={i * 0.05}
              variant={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {programs.map((program, i) => (
            <Reveal
              key={program.slug}
              delay={i * 0.06}
              variant={revealAt([...PROGRAM_CARD_VARIANTS], i)}
              className="h-full"
            >
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
