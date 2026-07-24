"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Pinned hero with scroll-scrubbed exit (Arbaz-style):
 * hero stays locked while you scroll a bit; copy fades, blurs, and rises.
 * First paint fits exactly in the viewport below the header — no scroll needed
 * to see the full banner image.
 */
export function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const copy = copyRef.current;
    const media = mediaRef.current;
    if (!section || !pin || !copy) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function syncPinHeight() {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const headerH = header?.offsetHeight ?? 88;
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${headerH}px`
      );
      // Pin = exactly the remaining first-screen height under the header
      const pinH = Math.max(window.innerHeight - headerH, 320);
      pin.style.height = `${pinH}px`;
      if (!reduceMotion) {
        // Track height = pin + ~one more screen of scrub travel
        section.style.height = `${pinH + window.innerHeight}px`;
      } else {
        section.style.height = `${pinH}px`;
      }
    }

    syncPinHeight();

    if (reduceMotion) {
      window.addEventListener("resize", syncPinHeight);
      return () => window.removeEventListener("resize", syncPinHeight);
    }

    let frame = 0;

    function update() {
      const rect = section!.getBoundingClientRect();
      const headerH =
        document.querySelector<HTMLElement>("[data-site-header]")
          ?.offsetHeight ?? 88;
      // Travel while pin is stuck under the header
      const pinTravel = Math.max(
        section!.offsetHeight - (window.innerHeight - headerH),
        1
      );
      const raw = Math.min(Math.max(-rect.top / pinTravel, 0), 1);
      const p = Math.min(1, raw / 0.82);

      const opacity = 1 - p * 0.96;
      const blur = p * 14;
      const rise = p * -110;

      copy!.style.opacity = String(opacity);
      copy!.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
      copy!.style.transform = `translate3d(0, ${rise.toFixed(2)}px, 0)`;

      if (media) {
        media.style.opacity = String(1 - p * 0.28);
        media.style.transform = `scale(${(1 + p * 0.045).toFixed(4)})`;
      }
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    function onResize() {
      syncPinHeight();
      update();
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-banner relative bg-black text-white">
      <div
        ref={pinRef}
        className="hero-banner__pin sticky top-[var(--site-header-height,5.75rem)] isolate overflow-hidden bg-black"
      >
        {/* Full-bleed banner — visible on first paint, all breakpoints */}
        <div
          ref={mediaRef}
          className="hero-banner__desktop-media pointer-events-none absolute inset-0 origin-center will-change-transform"
          aria-hidden
        >
          <Image
            src="/media/hero/coach-hero-banner.png"
            alt=""
            fill
            priority
            className="object-cover object-[78%_center] sm:object-right"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.82) 34%, rgba(0,0,0,0.35) 58%, transparent 78%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, #000 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1720px] items-center">
          <div
            ref={copyRef}
            className="hero-banner__copy flex w-full flex-col justify-center px-6 py-10 will-change-[transform,opacity,filter] sm:px-8 lg:w-[min(48%,36rem)] lg:px-16 xl:pl-24"
          >
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

            <h1 className="font-display text-[clamp(2.25rem,7vw,3.25rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance lg:text-[clamp(3rem,4.2vw,4.75rem)]">
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
        </div>
      </div>
    </section>
  );
}
