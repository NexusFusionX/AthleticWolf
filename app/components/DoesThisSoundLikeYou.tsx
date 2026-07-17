"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function DoesThisSoundLikeYou() {
  return (
    <section className="wheel-section bg-ink px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative w-full overflow-hidden rounded-2xl">
            <Image
              src="/media/struggle/does-this-sound-like-you.png"
              alt="Does this sound like you? Tried multiple diets but regained the weight, can't stay consistent, don't know what to eat, workout without seeing results, confused by social media fitness advice, no accountability. You're not alone. That's exactly what my coaching solves."
              width={1881}
              height={836}
              className="h-auto w-full"
              sizes="100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
