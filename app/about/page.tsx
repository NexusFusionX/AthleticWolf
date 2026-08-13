import Image from "next/image";
import {
  Certificate,
  EnvelopeSimple,
  InstagramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/app/components/Header";
import { AboutHeroBanner } from "@/app/components/AboutHeroBanner";
import { getWhatsAppUrl, SITE_CONTACT } from "@/app/lib/site-contact";

export const metadata = {
  title: "About Your Coach | Athletic Wolf",
  description:
    "Meet your ISSA-certified Athletic Wolf coach — 10+ years of experience in online training, nutrition, and real accountability for clients worldwide.",
};

const CREDENTIALS = [
  "ISSA-certified personal trainer",
  "10+ years coaching experience",
  "Custom training & nutrition plans",
  "Online coaching for clients worldwide",
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <AboutHeroBanner />

        <section className="section-y px-6 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Who is your coach?
              </p>
              <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
                Science-backed coaching with real accountability
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Athletic Wolf is built on a simple belief: everyone has an athlete
                inside them. Your coach combines structured training, practical
                nutrition guidance, and weekly check-ins so you are never guessing
                what to do next.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                After more than a decade in the fitness industry, the focus is
                still the same — meet you where you are, build a plan that fits
                your life, and adjust as you progress. Whether your goal is fat
                loss, muscle building, or full body recomposition, coaching is
                personal, not copy-paste.
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-premium">
              <Image
                src="/media/about/coach-about.png"
                alt="Athletic Wolf coach"
                fill
                quality={75}
                className="object-cover object-center"
                sizes="(min-width: 1024px) 28rem, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-black page-section px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/media/about/coach-dubai.jpg"
                  alt="Coach with over 10 years of fitness experience"
                  fill
                  quality={75}
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  Experience
                </p>
                <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
                  10+ years in the trenches
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  From in-person gym coaching to fully online programs, your coach
                  has spent more than ten years refining how to get people
                  consistent — not just motivated for a week.
                </p>
                <ul className="mt-6 space-y-3">
                  {CREDENTIALS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/85 sm:text-base"
                    >
                      <Certificate
                        size={20}
                        weight="duotone"
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-y px-6 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-premium lg:max-w-none">
              <Image
                src="/media/about/coach-mirror.jpg"
                alt="Athletic Wolf coach — leading by example"
                fill
                quality={75}
                className="object-cover object-center"
                sizes="(min-width: 1024px) 28rem, 100vw"
              />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Leading by example
              </p>
              <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
                I practice what I preach
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Coaching is not just programming on a screen. Your coach lives the
                same discipline expected of every client — structured training,
                consistent nutrition, and long-term commitment to the process.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                That standard is what gets built into every Athletic Wolf plan:
                realistic, sustainable, and designed to get you results you can
                actually maintain.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-black page-section px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Get in touch
            </p>
            <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
              Ready to talk to your coach?
            </h2>
            <p className="mt-4 text-muted">
              Reach out with questions about packages, coaching, or whether
              Athletic Wolf is the right fit for your goals.
            </p>

            <ul className="mt-10 flex flex-col gap-3 text-left sm:mx-auto sm:max-w-md">
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-sm text-white/85 transition-colors hover:border-accent/40 hover:text-white"
                >
                  <EnvelopeSimple size={20} className="text-accent" aria-hidden />
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-sm text-white/85 transition-colors hover:border-accent/40 hover:text-white"
                >
                  <WhatsappLogo size={20} className="text-accent" aria-hidden />
                  WhatsApp {SITE_CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-sm text-white/85 transition-colors hover:border-accent/40 hover:text-white"
                >
                  <InstagramLogo size={20} className="text-accent" aria-hidden />
                  {SITE_CONTACT.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
