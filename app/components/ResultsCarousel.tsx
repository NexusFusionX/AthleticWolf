"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal } from "./Reveal";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const transformations = [
  {
    label: "Transformation 1",
    beforeSrc: "/media/results/demo-before.png",
    afterSrc: "/media/results/demo-after.png",
    name: "Client A",
    result: "12 lbs lost in 8 weeks",
  },
  {
    label: "Transformation 2",
    name: "Client B",
    result: "20 lbs lost in 12 weeks",
  },
  {
    label: "Transformation 3",
    name: "Client C",
    result: "15 lbs lost in 10 weeks",
  },
];

export function ResultsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? transformations.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="results"
      className="wheel-section border-y border-line bg-ink px-6 py-20 text-white sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-4xl sm:text-5xl">
            Real Clients, Real Progress
          </h2>
          <p className="mt-4 text-muted">
            Drag the slider to see each transformation for yourself.
          </p>
        </Reveal>

        {/* Desktop Grid */}
        <div className="mt-14 hidden grid-cols-3 gap-5 sm:grid">
          {transformations.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <BeforeAfterSlider
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                beforeLabel="BEFORE"
                afterLabel="AFTER"
              />
            </Reveal>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mt-14 sm:hidden">
          <BeforeAfterSlider
            beforeSrc={transformations[currentIndex].beforeSrc}
            afterSrc={transformations[currentIndex].afterSrc}
            beforeLabel="BEFORE"
            afterLabel="AFTER"
          />

          {/* Arrows + dots below, like the other carousels */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Previous transformation"
            >
              <CaretLeft size={16} weight="bold" />
            </button>

            <div className="flex items-center gap-2">
              {transformations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-accent" : "w-2 bg-white/25"
                  }`}
                  aria-label={`Go to transformation ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Next transformation"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
