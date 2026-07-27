"use client";

import { useCallback, useRef } from "react";

type ProcessCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export function ProcessCard({ emoji, title, description }: ProcessCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--glow-opacity", "0");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  }, []);

  return (
    <article
      ref={cardRef}
      className="process-card group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-opacity": "0",
        } as React.CSSProperties
      }
    >
      <span className="process-card-top-line" aria-hidden />
      <span className="process-card-glow" aria-hidden />

      <div className="process-card__body">
        <div className="process-icon-showcase">
          <div className="process-icon-frame">
            <span className="process-icon-emoji" aria-hidden suppressHydrationWarning>
              {emoji}
            </span>
          </div>
        </div>

        <div className="process-card__content">
          <h3 className="process-card-title">{title}</h3>
          <p className="process-card-desc">{description}</p>
        </div>
      </div>
    </article>
  );
}
