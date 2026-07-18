"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function DoesThisSoundLikeYou() {
  return (
    <section className="wheel-section w-full max-w-none bg-ink p-0 m-0">
      <Reveal>
        {/* Mobile: portrait version, shown at natural aspect ratio (no cropping) */}
        <div className="relative w-full sm:hidden">
          <Image
            src="/media/struggle/does-this-sound-like-you-mobile.png"
            alt="Does this sound like you? Tried multiple diets but regained the weight, can't stay consistent, don't know what to eat, workout without seeing results, confused by social media fitness advice, no accountability. You're not alone. That's exactly what my coaching solves."
            width={941}
            height={1672}
            className="h-auto w-full"
            sizes="100vw"
            priority={false}
          />
        </div>

        {/* Desktop: wide version, fixed-height cover crop */}
        <div className="relative hidden h-[80vh] w-full overflow-hidden sm:block">
          <Image
            src="/media/struggle/does-this-sound-like-you.png"
            alt="Does this sound like you? Tried multiple diets but regained the weight, can't stay consistent, don't know what to eat, workout without seeing results, confused by social media fitness advice, no accountability. You're not alone. That's exactly what my coaching solves."
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </Reveal>
    </section>
  );
}
