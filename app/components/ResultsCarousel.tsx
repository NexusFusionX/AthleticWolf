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
          <div className="relative">
            <BeforeAfterSlider
              beforeSrc={transformations[currentIndex].beforeSrc}
              afterSrc={transformations[currentIndex].afterSrc}
              beforeLabel="BEFORE"
              afterLabel="AFTER"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-accent/80 text-white hover:bg-accent transition-colors"
              aria-label="Previous transformation"
            >
              <CaretLeft size={20} weight="fill" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-accent/80 text-white hover:bg-accent transition-colors"
              aria-label="Next transformation"
            >
              <CaretRight size={20} weight="fill" />
            </button>
          </div>

          {/* Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {transformations.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all ${
                  i === currentIndex
                    ? "bg-accent h-2 w-8"
                    : "bg-white/20 h-2 w-2"
                } rounded-full`}
                aria-label={`Go to transformation ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="mt-4 text-center text-sm text-white/60">
            {currentIndex + 1} of {transformations.length}
          </p>
        </div>
      </div>
    </section>
  );
}
