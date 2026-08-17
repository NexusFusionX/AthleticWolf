import Image from "next/image";
import Link from "next/link";
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
import { AccentHeading } from "./components/AccentHeading";
import { PackageGrid } from "./components/PackageCard";
import { Testimonials } from "./components/Testimonials";
import { KickoffGuide } from "./components/KickoffGuide";

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
        <PromoMarquee />
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
                All plans are prepaid 6-month coaching packages — pay once at
                checkout for the full term.
              </p>
            </Reveal>

            <PackageGrid className="mt-8" />
          </div>
        </section>

        <CoachVideos />

        <section id="about" className="section-y wheel-section section-surface px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
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
                  athlete inside them. As an ISSA-certified coach with 10+ years
                  of experience, every program combines science-backed training,
                  nutrition guidance, and real accountability, delivered fully
                  online to clients wherever they are.
                </p>
                <Link
                  href="/about"
                  className="btn btn-outline mt-8 inline-flex px-6 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  Learn more
                </Link>
              </Reveal>

              <Reveal delay={0.1} variant="right">
                <div className="shadow-premium relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
                  <Image
                    src="/media/about/coach-about.png"
                    alt="Athletic Wolf coach"
                    fill
                    quality={75}
                    className="h-full w-full object-cover object-center"
                    sizes="(min-width: 1024px) 40rem, 100vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Testimonials />
        <KickoffGuide />

        <SeoText />

        <section id="faq" className="section-y px-6 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal variant="rise">
              <Faq showIntro />
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
