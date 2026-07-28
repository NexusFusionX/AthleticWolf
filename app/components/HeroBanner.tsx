import Image from "next/image";
import { Check, Play } from "@phosphor-icons/react/dist/ssr";

const HERO_ALT =
  "Athletic Wolf ISSA-certified coach at an outdoor gym";

const DESKTOP_HERO = {
  src: "/media/hero/coach-hero-outdoor.png",
  width: 1536,
  height: 1024,
} as const;

const MOBILE_HERO = {
  src: "/media/hero/coach-hero-mobile.png",
  width: 1080,
  height: 1920,
} as const;

const DESKTOP_BULLETS = [
  "ISSA-certified coach — plans built for you",
  "100% personalized training & nutrition",
  "Weekly check-ins & direct support",
] as const;

function HeroBannerCopyMobile() {
  return (
    <>
      <div className="hero-banner__eyebrow mb-4 flex items-center gap-3 sm:mb-5">
        <span
          aria-hidden
          className="hero-banner__rule inline-block h-px w-8 shrink-0 bg-accent"
        />
        <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-white/55 sm:text-[10px]">
          Online Coaching,{" "}
          <span className="text-accent">Worldwide</span>
        </p>
      </div>

      <h1 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance">
        Unleash The
        <br />
        <span className="text-accent">Inner Wolf</span>
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/72 sm:mt-5 sm:text-base">
        ISSA-certified coaching built around your life, not a template.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:mt-8">
        <a
          href="/quiz?start=1"
          className="btn btn-accent px-6 py-3.5 text-sm font-semibold text-white sm:px-7"
        >
          Start free assessment
        </a>
        <a
          href="#results"
          className="btn btn-outline px-6 py-3.5 text-sm font-semibold sm:px-7"
        >
          See client results
        </a>
      </div>
    </>
  );
}

function HeroBannerCopyDesktop() {
  return (
    <div className="hero-banner__copy hero-banner__copy--desktop">
      <span className="hero-banner__badge hero-banner__reveal">
        Online Coaching · Worldwide
      </span>

      <h1 className="hero-banner__title hero-banner__reveal font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance">
        Unleash The
        <br />
        <span className="text-accent">Inner Wolf</span>
      </h1>

      <p className="hero-banner__lead hero-banner__reveal mt-5 max-w-lg text-base leading-relaxed text-white/75 lg:text-lg">
        ISSA-certified coaching built around your life, schedule, and goals —
        not a template.
      </p>

      <ul className="hero-banner__bullets hero-banner__reveal mt-6 space-y-2.5">
        {DESKTOP_BULLETS.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/82 lg:text-[0.9375rem]">
            <Check
              size={18}
              weight="bold"
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="hero-banner__actions hero-banner__reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href="/quiz?start=1"
          className="btn btn-accent inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white"
        >
          Start Free Assessment — 2 Min
        </a>
        <a
          href="#coach-videos"
          className="btn btn-outline inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
        >
          <Play size={18} weight="fill" aria-hidden />
          Watch Coach Videos
        </a>
      </div>

      <p className="hero-banner__trust hero-banner__reveal mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-white/50 lg:text-[0.8125rem]">
        ISSA Certified · 100% Personalized · Weekly Check-ins
      </p>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="hero-banner relative w-full bg-black text-white">
      {/* Mobile — unchanged: full portrait photo + top content card */}
      <div className="hero-banner__frame hero-banner__frame--mobile relative isolate md:hidden">
        <Image
          src={MOBILE_HERO.src}
          alt={HERO_ALT}
          width={MOBILE_HERO.width}
          height={MOBILE_HERO.height}
          priority
          className="hero-banner__media-img hero-banner__media-img--mobile block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner hero-banner__inner--mobile">
          <div className="hero-banner__panel hero-banner__panel--mobile">
            <HeroBannerCopyMobile />
          </div>
        </div>
      </div>

      {/* Desktop — full image (no crop) + text on photo's dark left zone */}
      <div className="hero-banner__frame hero-banner__frame--desktop relative isolate hidden w-full md:block">
        <Image
          src={DESKTOP_HERO.src}
          alt={HERO_ALT}
          width={DESKTOP_HERO.width}
          height={DESKTOP_HERO.height}
          priority
          className="hero-banner__media-img hero-banner__media-img--desktop block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner hero-banner__inner--desktop">
          <HeroBannerCopyDesktop />
        </div>
      </div>
    </section>
  );
}
