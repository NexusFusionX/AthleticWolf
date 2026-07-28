import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Faq } from "./components/Faq";
import { Reveal } from "./components/Reveal";
import { Header } from "./components/Header";
import { WhoItIsFor } from "./components/WhoItIsFor";
import { DoesThisSoundLikeYou } from "./components/DoesThisSoundLikeYou";
import { HowCoachingWorks } from "./components/HowCoachingWorks";
import { ResultsCarousel } from "./components/ResultsCarousel";
import { CoachVideos } from "./components/CoachVideos";
import { Programs } from "./components/Programs";
import { HeroBadges } from "./components/HeroBadges";
import { HeroBanner } from "./components/HeroBanner";
import { SeoText } from "./components/SeoText";
import { PromoMarquee } from "./components/PromoMarquee";
import { BrandLogo } from "./components/BrandLogo";
import { AccentHeading } from "./components/AccentHeading";
import { PackageGrid } from "./components/PackageCard";

const differentiators = [
  {
    title: "Personalized Programs",
    desc: "Every plan is tailored to your body, schedule, and goals. No cookie-cutter workouts.",
  },
  {
    title: "Performance Focused",
    desc: "Strength, speed, endurance, and mobility. We train the whole athlete, not just one muscle group.",
  },
  {
    title: "Real Accountability",
    desc: "Weekly check-ins, progress tracking, and direct access to your coach keep you on track.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />

      <main id="main-content">
        <HeroBanner />
        <HeroBadges />
        <Programs />
        <HowCoachingWorks />
        <WhoItIsFor />
        <DoesThisSoundLikeYou />

        {/* Results before pricing — social proof first */}
        <ResultsCarousel />

        <section id="packages" className="section-y wheel-section px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-xl" variant="skew-up">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Membership
              </p>
              <AccentHeading
                accent="Choose"
                after="Your Package"
                className="font-display mt-3 text-4xl sm:text-5xl"
              />
              <p className="mt-4 text-muted">
                All plans are 6-month coaching packages designed to help you reach
                your fitness goals with expert guidance.
              </p>
            </Reveal>

            <PackageGrid className="mt-14" />
          </div>
        </section>

        <CoachVideos />

        <section id="about" className="section-y wheel-section section-surface px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Reveal variant="left">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  About Your Coach
                </p>
                <AccentHeading
                  before="Built For People Who Refuse To"
                  accent="Settle"
                  className="font-display mt-3 text-4xl sm:text-5xl"
                />
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Athletic Wolf is built on a simple belief: everyone has an
                  athlete inside them. As an ISSA-certified coach, every program
                  combines science-backed training, nutrition guidance, and real
                  accountability, delivered fully online to clients wherever
                  they are.
                </p>
              </Reveal>

              <Reveal delay={0.1} variant="right">
                <div className="shadow-premium relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
                  <Image
                    src="/media/about/coach-mountain.jpg"
                    alt="Athletic Wolf coach training outdoors"
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(min-width: 1024px) 40rem, 100vw"
                  />
                </div>
              </Reveal>
            </div>

            <div className="mt-14 border-t border-line">
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06} variant="fade">
                  <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-10">
                    <h3 className="font-display text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SeoText />
        <PromoMarquee />

        <section id="faq" className="section-y px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal variant="rise">
              <Faq showIntro />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-6 pt-16 pb-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <BrandLogo height={80} />
              <p className="mt-4 max-w-xs text-sm text-white/55">
                ISSA-certified online personal training and nutrition coaching,
                built for clients worldwide. No gym required.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent/80">
                ISSA Certified Personal Trainer
              </p>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Explore
              </h5>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <Link href="/#programs" className="hover:text-white">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/#packages" className="hover:text-white">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link href="/#results" className="hover:text-white">
                    Results
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Support
              </h5>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/55">
                <li>
                  <Link href="/#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                Contact
              </h5>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-white/55">
                <li>
                  <a
                    href="mailto:hello@athleticwolf.com"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <EnvelopeSimple size={16} weight="regular" aria-hidden />
                    hello@athleticwolf.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/athletic_wolf7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <InstagramLogo size={16} weight="regular" aria-hidden />
                    @athletic_wolf7
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Athletic Wolf. All rights reserved.</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/privacy" className="hover:text-white/70">
                Privacy
              </Link>
              <Link href="/refund" className="hover:text-white/70">
                Refunds
              </Link>
              <Link href="/terms" className="hover:text-white/70">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
