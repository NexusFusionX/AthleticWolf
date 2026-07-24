"use client";

import { useEffect, useState } from "react";

const MIN_MS = 1500;
const MAX_MS = 15000;
const SESSION_KEY = "aw-preloader-seen";
const CX = 130;
const CY = 130;
const R = 115;
const CIRC = 2 * Math.PI * R;

/** Precomputed on one machine so SSR/client never diverge */
const TICKS = [
  { key: 0, x1: 238, y1: 130, x2: 248, y2: 130, opacity: 0.45 },
  { key: 1, x1: 236.359, y1: 148.754, x2: 246.207, y2: 150.49, opacity: 0.18 },
  { key: 2, x1: 231.487, y1: 166.938, x2: 240.884, y2: 170.358, opacity: 0.18 },
  { key: 3, x1: 223.531, y1: 184, x2: 232.191, y2: 189, opacity: 0.45 },
  { key: 4, x1: 212.733, y1: 199.421, x2: 220.393, y2: 205.849, opacity: 0.18 },
  { key: 5, x1: 199.421, y1: 212.733, x2: 205.849, y2: 220.393, opacity: 0.18 },
  { key: 6, x1: 184, y1: 223.531, x2: 189, y2: 232.191, opacity: 0.45 },
  { key: 7, x1: 166.938, y1: 231.487, x2: 170.358, y2: 240.884, opacity: 0.18 },
  { key: 8, x1: 148.754, y1: 236.359, x2: 150.49, y2: 246.207, opacity: 0.18 },
  { key: 9, x1: 130, y1: 238, x2: 130, y2: 248, opacity: 0.45 },
  { key: 10, x1: 111.246, y1: 236.359, x2: 109.51, y2: 246.207, opacity: 0.18 },
  { key: 11, x1: 93.062, y1: 231.487, x2: 89.642, y2: 240.884, opacity: 0.18 },
  { key: 12, x1: 76, y1: 223.531, x2: 71, y2: 232.191, opacity: 0.45 },
  { key: 13, x1: 60.579, y1: 212.733, x2: 54.151, y2: 220.393, opacity: 0.18 },
  { key: 14, x1: 47.267, y1: 199.421, x2: 39.607, y2: 205.849, opacity: 0.18 },
  { key: 15, x1: 36.469, y1: 184, x2: 27.809, y2: 189, opacity: 0.45 },
  { key: 16, x1: 28.513, y1: 166.938, x2: 19.116, y2: 170.358, opacity: 0.18 },
  { key: 17, x1: 23.641, y1: 148.754, x2: 13.793, y2: 150.49, opacity: 0.18 },
  { key: 18, x1: 22, y1: 130, x2: 12, y2: 130, opacity: 0.45 },
  { key: 19, x1: 23.641, y1: 111.246, x2: 13.793, y2: 109.51, opacity: 0.18 },
  { key: 20, x1: 28.513, y1: 93.062, x2: 19.116, y2: 89.642, opacity: 0.18 },
  { key: 21, x1: 36.469, y1: 76, x2: 27.809, y2: 71, opacity: 0.45 },
  { key: 22, x1: 47.267, y1: 60.579, x2: 39.607, y2: 54.151, opacity: 0.18 },
  { key: 23, x1: 60.579, y1: 47.267, x2: 54.151, y2: 39.607, opacity: 0.18 },
  { key: 24, x1: 76, y1: 36.469, x2: 71, y2: 27.809, opacity: 0.45 },
  { key: 25, x1: 93.062, y1: 28.513, x2: 89.642, y2: 19.116, opacity: 0.18 },
  { key: 26, x1: 111.246, y1: 23.641, x2: 109.51, y2: 13.793, opacity: 0.18 },
  { key: 27, x1: 130, y1: 22, x2: 130, y2: 12, opacity: 0.45 },
  { key: 28, x1: 148.754, y1: 23.641, x2: 150.49, y2: 13.793, opacity: 0.18 },
  { key: 29, x1: 166.938, y1: 28.513, x2: 170.358, y2: 19.116, opacity: 0.18 },
  { key: 30, x1: 184, y1: 36.469, x2: 189, y2: 27.809, opacity: 0.45 },
  { key: 31, x1: 199.421, y1: 47.267, x2: 205.849, y2: 39.607, opacity: 0.18 },
  { key: 32, x1: 212.733, y1: 60.579, x2: 220.393, y2: 54.151, opacity: 0.18 },
  { key: 33, x1: 223.531, y1: 76, x2: 232.191, y2: 71, opacity: 0.45 },
  { key: 34, x1: 231.487, y1: 93.062, x2: 240.884, y2: 89.642, opacity: 0.18 },
  { key: 35, x1: 236.359, y1: 111.246, x2: 246.207, y2: 109.51, opacity: 0.18 },
];

function removeBootSplash() {
  const boot = document.getElementById("aw-boot");
  if (boot) boot.remove();
  document.documentElement.classList.add("aw-boot-done");
}

export function SitePreloader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTicks, setShowTicks] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    // Already played this tab session — never show again on Get Started / dashboard / etc.
    if (alreadySeen || document.documentElement.classList.contains("aw-boot-skip")) {
      removeBootSplash();
      document.documentElement.classList.add("aw-boot-done");
      setVisible(false);
      return;
    }

    // Keep #aw-boot until the full loader is painted (avoids homepage flash)
    setVisible(true);
    setShowTicks(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      removeBootSplash();
      setVisible(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let frame = 0;
    let finished = false;
    let pageReady = document.readyState === "complete";
    let minElapsed = false;
    let bootHandedOff = false;

    function handOffBoot() {
      if (bootHandedOff) return;
      bootHandedOff = true;
      removeBootSplash();
    }

    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
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

    // Two RAFs: commit preloader to DOM, then drop the HTML splash
    const handOffId = requestAnimationFrame(() => {
      requestAnimationFrame(handOffBoot);
    });
    frame = requestAnimationFrame(tick);

    const onReady = () => {
      pageReady = true;
      tryFinish();
    };
    if (!pageReady) window.addEventListener("load", onReady, { once: true });

    const hardCap = window.setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(handOffId);
      window.clearTimeout(hardCap);
      window.removeEventListener("load", onReady);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

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

      <span className="aw-pre-corner aw-pre-corner--tl" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--tr" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--bl" aria-hidden />
      <span className="aw-pre-corner aw-pre-corner--br" aria-hidden />

      <p className="aw-pre-brand">
        ATHLETIC <span>WOLF</span>
      </p>

      <div className="aw-pre-core">
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

            {showTicks &&
              TICKS.map((t) => (
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
