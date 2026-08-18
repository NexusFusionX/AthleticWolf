"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";
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
    beforeSrc: "/media/results/client-1-before.png",
    afterSrc: "/media/results/client-1-after.png",
    name: "Client B",
    result: "Body recomposition",
  },
  {
    label: "Transformation 3",
    beforeSrc: "/media/results/client-2-before.png",
    afterSrc: "/media/results/client-2-after.png",
    name: "Client C",
    result: "Fat loss transformation",
  },
];

function hasImages(item: (typeof transformations)[number]) {
  return Boolean(item.beforeSrc && item.afterSrc);
}

const readyTransformations = transformations.filter(hasImages);

export function ResultsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pendingCount = transformations.length - readyTransformations.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % readyTransformations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? readyTransformations.length - 1 : prev - 1,
    );
  };

  if (readyTransformations.length === 0) {
    return null;
  }

  return (
    <section
      id="results"
      className="section-y wheel-section section-surface border-y border-line bg-ink px-4 text-white sm:px-6 lg:px-7"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl" variant="blur-up">
          <AccentHeading
            before="Real"
            accent="Clients"
            after=", Real Progress"
            className="font-display text-4xl sm:text-5xl"
          />
          <p className="mt-4 text-muted">
            Drag the slider to see each transformation for yourself.
          </p>
        </Reveal>

        <div className="mt-8 hidden grid-cols-3 gap-5 sm:grid">
          {readyTransformations.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              variant={i === 0 ? "scale" : i === 1 ? "rise" : "tilt-left"}
            >
              <div>
                <BeforeAfterSlider
                  beforeSrc={item.beforeSrc}
                  afterSrc={item.afterSrc}
                  beforeLabel="BEFORE"
                  afterLabel="AFTER"
                />
                {item.name && (
                  <p className="mt-3 text-sm font-semibold text-white">{item.name}</p>
                )}
                {item.result && (
                  <p className="mt-1 text-xs text-muted">{item.result}</p>
                )}
              </div>
            </Reveal>
          ))}
          {pendingCount > 0 && (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center">
              <p className="font-display text-lg text-white/80">More coming soon</p>
              <p className="mt-2 text-sm text-muted">
                {pendingCount} more transformation{pendingCount > 1 ? "s" : ""} being added.
              </p>
            </div>
          )}
        </div>

        <Reveal variant="scale">
          <div className="mt-8 sm:hidden">
            <BeforeAfterSlider
              beforeSrc={readyTransformations[currentIndex].beforeSrc}
              afterSrc={readyTransformations[currentIndex].afterSrc}
              beforeLabel="BEFORE"
              afterLabel="AFTER"
            />

            {readyTransformations.length > 1 && (
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
                  aria-label="Previous transformation"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>

                <div className="flex items-center gap-2">
                  {readyTransformations.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex ? "w-6 bg-accent" : "w-2 bg-white/25"
                      }`}
                      aria-label={`Go to transformation ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
                  aria-label="Next transformation"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
