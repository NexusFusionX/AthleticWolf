"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function DoesThisSoundLikeYou() {
  return (
    <section className="wheel-section w-full max-w-none bg-ink p-0 m-0">
      <Reveal>
        <div className="relative h-[80vh] w-full overflow-hidden">
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
