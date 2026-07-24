"use client";

import { useEffect, useMemo, useState } from "react";

const MIN_MS = 1500;
const MAX_MS = 15000;
const CX = 130;
const CY = 130;
const R = 115;
const CIRC = 2 * Math.PI * R;

function tickLines() {
  const lines = [];
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const long = i % 3 === 0;
    const inner = long ? 108 : 110;
    const outer = 118;
    const round = (n: number) => Math.round(n * 1000) / 1000;
    lines.push({
      key: i,
      x1: round(CX + Math.cos(a) * inner),
      y1: round(CY + Math.sin(a) * inner),
      x2: round(CX + Math.cos(a) * outer),
      y2: round(CY + Math.sin(a) * outer),
      opacity: long ? 0.45 : 0.18,
    });
  }
  return lines;
}

export function SitePreloader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const ticks = useMemo(() => tickLines(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let frame = 0;
    let finished = false;
    let pageReady = document.readyState === "complete";
    let minElapsed = false;

    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      setLeaving(true);
      window.setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }, 850);
    }

    function tryFinish() {
      if (minElapsed && pageReady) finish();
    }

    function tick(now: number) {
      const elapsed = now - started;
      if (elapsed >= MIN_MS) minElapsed = true;

      let next: number;
      if (elapsed < MIN_MS) {
        const t = elapsed / MIN_MS;
        next = Math.round((1 - Math.pow(1 - t, 2.4)) * 90);
      } else if (!pageReady) {
        const extra = Math.min(1, (elapsed - MIN_MS) / (MAX_MS - MIN_MS));
        next = Math.min(98, 90 + Math.round(extra * 8));
      } else {
        next = 100;
      }

      setProgress(next);
      tryFinish();

      if (elapsed >= MAX_MS) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    const onReady = () => {
      pageReady = true;
      tryFinish();
    };
    if (!pageReady) window.addEventListener("load", onReady, { once: true });

    const hardCap = window.setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hardCap);
      window.removeEventListener("load", onReady);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted || !visible) return null;

  const dashOffset = CIRC - (progress / 100) * CIRC;

  return (
    <div
      className={`aw-preloader ${leaving ? "aw-preloader--done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Athletic Wolf"
    >
      <div className="aw-pre-grid" aria-hidden />
      <div className="aw-pre-vignette" aria-hidden />
      <div className="aw-pre-scanline" aria-hidden />

      <div className="aw-pre-particles" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="aw-pre-particle" style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <div className="aw-pre-ambient" aria-hidden>
        <div className="aw-pre-glow" />
      </div>

      {/* Corner brackets */}
      <span className="aw-pre-corner aw-pre-corner--tl" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--tr" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--bl" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--br" aria-hidden />

      <p className="aw-pre-brand">
        ATHLETIC <span>WOLF</span>
      </p>

      <div className="aw-pre-core">
        {/* Round logo — fixed size, no Next/Image fill (that was blowing up fullscreen) */}
        <div
          className="aw-pre-logo-round"
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/athletic-wolf-logo.png"
            alt="Athletic Wolf"
            width={88}
            height={88}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        <div className="aw-pre-ring-stage">
          <div className="aw-pre-orbit" aria-hidden>
            <span className="aw-pre-orbit-ring" />
            <span className="aw-pre-orbit-ring aw-pre-orbit-ring--reverse" />
          </div>

          <div className="aw-pre-radar" aria-hidden />

          <svg className="aw-pre-ring-svg" viewBox="0 0 260 260" aria-hidden>
            <defs>
              <linearGradient id="awPreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,138,77,0.5)" />
                <stop offset="50%" stopColor="#FF8A4D" />
                <stop offset="100%" stopColor="rgba(255,107,53,0.85)" />
              </linearGradient>
              <filter id="awPreRingGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {ticks.map((t) => (
              <line
                key={t.key}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                className="aw-pre-ring-tick"
                opacity={t.opacity}
              />
            ))}

            <circle className="aw-pre-ring-track" cx={CX} cy={CY} r={R} />
            <circle
              className="aw-pre-ring-progress"
              cx={CX}
              cy={CY}
              r={R}
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="aw-pre-count-wrap">
            <span className="aw-pre-count">{progress}</span>
            <span className="aw-pre-count-unit">%</span>
          </div>
        </div>

        <div className="aw-pre-meta">
          <p className="aw-pre-status">Initializing systems</p>
          <div className="aw-pre-bar">
            <div
              className="aw-pre-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <p className="aw-pre-label">Athletic Wolf Fitness Programs</p>
          <p className="aw-pre-tagline">Online Coaching Worldwide</p>
        </div>
      </div>
    </div>
  );
}
