"use client";

import { Reveal } from "./Reveal";

const STRUGGLE_ALT =
  "Does this sound like you? Tried multiple diets but regained the weight, can't stay consistent, don't know what to eat, workout without seeing results, confused by social media fitness advice, no accountability. You're not alone. That's exactly what my coaching solves.";

export function DoesThisSoundLikeYou() {
  return (
    <section className="wheel-section w-full max-w-none bg-ink p-0 m-0">
      <Reveal variant="zoom">
        <div className="relative w-full sm:hidden">
          {/* Plain img so replaced PNGs show immediately (no Next image cache). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/struggle/does-this-sound-like-you-mobile.png"
            alt={STRUGGLE_ALT}
            className="block h-auto w-full"
            decoding="async"
          />
        </div>

        <div className="relative hidden h-[80vh] w-full overflow-hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/struggle/does-this-sound-like-you.png"
            alt={STRUGGLE_ALT}
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
          />
        </div>
      </Reveal>
    </section>
  );
}
