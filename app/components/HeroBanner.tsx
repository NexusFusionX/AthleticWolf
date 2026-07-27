import Image from "next/image";

function HeroBannerCopy() {
  return (
    <div className="hero-banner__copy flex w-full flex-col justify-start px-6 pb-10 pt-14 sm:px-8 sm:pt-16 md:justify-center md:py-16 lg:w-[min(46%,34rem)] lg:px-16 xl:pl-24">
      <div className="mb-5 flex items-center gap-3 lg:mb-8">
        <span
          aria-hidden
          className="hero-banner__rule inline-block h-px w-8 shrink-0 bg-accent"
        />
        <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-white/45 lg:text-[10px]">
          Online Coaching,{" "}
          <span className="text-accent">Worldwide</span>
        </p>
      </div>

      <h1 className="font-display text-[clamp(2rem,8vw,3.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance lg:text-[clamp(3rem,4.2vw,4.75rem)]">
        Unleash The
        <br />
        <span className="text-accent">Inner Wolf</span>
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg lg:mt-7">
        ISSA-certified coaching built around your life, not a template.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10">
        <a
          href="#packages"
          className="btn btn-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
        >
          View Packages
        </a>
      </div>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="hero-banner relative bg-black text-white">
      {/* Mobile — full 1080×1920 portrait, no crop, no overlay */}
      <div className="hero-banner__frame hero-banner__frame--mobile relative isolate md:hidden">
        <Image
          src="/media/hero/coach-hero-mobile.png"
          alt=""
          width={1080}
          height={1920}
          priority
          className="hero-banner__media-img hero-banner__media-img--mobile block h-auto w-full"
          sizes="100vw"
        />
        <div className="hero-banner__inner absolute inset-0 z-10 mx-auto flex w-full max-w-[1720px] items-start">
          <HeroBannerCopy />
        </div>
      </div>

      {/* Desktop — full-bleed horizontal banner (unchanged) */}
      <div className="hero-banner__frame hero-banner__frame--desktop relative isolate hidden overflow-hidden md:block">
        <div className="hero-banner__media pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/media/hero/coach-hero-gym.png"
            alt=""
            fill
            priority
            className="hero-banner__media-img hero-banner__media-img--desktop object-cover object-right"
            sizes="100vw"
          />
          <div className="hero-banner__scrim absolute inset-0" />
        </div>

        <div className="hero-banner__inner relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1720px] items-center">
          <HeroBannerCopy />
        </div>
      </div>
    </section>
  );
}
