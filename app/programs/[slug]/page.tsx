import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { AccentHeading } from "@/app/components/AccentHeading";
import { programs } from "@/app/data/programs";
import { Check } from "@phosphor-icons/react/dist/ssr";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: `${program.title} | Athletic Wolf`,
    description: program.desc,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-line bg-ink px-6 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#programs"
              className="inline-block text-sm font-semibold text-accent hover:text-accent-bright transition-colors mb-6"
            >
              ← All Programs
            </Link>
            <AccentHeading
              as="h1"
              accent={program.titleAccent}
              before={program.titleBefore}
              after={program.titleAfter}
              className="font-display text-4xl sm:text-5xl"
            />
            <p className="mt-4 max-w-xl text-white/75">{program.desc}</p>
          </div>
        </section>

        <section className="page-section px-4 sm:px-6 lg:px-7">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="overflow-hidden rounded-2xl border border-line bg-ink">
                <Image
                  src={program.src}
                  alt={program.title}
                  width={900}
                  height={1200}
                  quality={75}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 680px, 100vw"
                />
              </div>

              <p className="mt-8 text-lg leading-relaxed text-muted">
                {program.longDesc}
              </p>

              <AccentHeading
                before="What You"
                accent="Get"
                className="font-display mt-10 text-2xl"
              />
              <ul className="mt-6 flex flex-col gap-3">
                {program.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3 border-b border-dashed border-line pb-3">
                    <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-2xl border border-line bg-card p-6 shadow-premium">
              <p className="font-display text-lg">Ready to start?</p>
              <p className="mt-2 text-sm text-muted">
                Every program is built into our coaching packages. Pick a package
                and we'll tailor it to this goal from day one.
              </p>
              <Link
                href="/packages"
                className="btn btn-accent mt-6 w-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
              >
                View Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
