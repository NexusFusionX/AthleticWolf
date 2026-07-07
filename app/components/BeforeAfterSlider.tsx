"use client";

import { useState } from "react";
import Image from "next/image";

function PlaceholderContent({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M8 6l1.5-2.5h5L16 6" />
          <circle cx="12" cy="13" r="3.2" />
        </svg>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted">
        {label} photo coming soon
      </p>
    </div>
  );
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="shadow-premium relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl border border-line bg-ink-soft">
      <div className="absolute inset-0">
        {afterSrc ? (
          <Image src={afterSrc} alt={afterLabel} fill className="object-cover" />
        ) : (
          <PlaceholderContent label={afterLabel} />
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {afterLabel}
        </span>
      </div>

      <div
        className="absolute inset-0 border-r border-white bg-paper"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeSrc ? (
          <Image src={beforeSrc} alt={beforeLabel} fill className="object-cover" />
        ) : (
          <PlaceholderContent label={beforeLabel} />
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {beforeLabel}
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 flex w-9 -translate-x-1/2 items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm text-white shadow-lg">
          ↔
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Drag to compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
