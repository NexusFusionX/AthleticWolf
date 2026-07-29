"use client";

import { useEffect, useState } from "react";

const MIN_MS = 700;
const MAX_MS = 12000;
const CX = 130;
const CY = 130;
const R = 72;
const CIRC = 2 * Math.PI * R;

function removeBootSplash() {
  const boot = document.getElementById("aw-boot");
  if (boot) boot.remove();
  document.documentElement.classList.add("aw-boot-done");
}

export function SitePreloader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    const isHome = path === "/" || path === "";

    if (
      !isHome ||
      document.documentElement.classList.contains("aw-boot-skip")
    ) {
      removeBootSplash();
      document.documentElement.classList.add("aw-boot-done");
      setVisible(false);
      return;
    }

    setVisible(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      removeBootSplash();
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
      setProgress(100);
      setLeaving(true);
      window.setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }, 600);
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
        next = Math.round((1 - Math.pow(1 - t, 2)) * 92);
      } else if (!pageReady) {
        next = Math.min(98, 92 + Math.round((elapsed - MIN_MS) / 400));
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
      className={`aw-preloader aw-preloader--logo ${leaving ? "aw-preloader--done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Athletic Wolf"
    >
      <div className="aw-preloader--logo__stage">
        <svg className="aw-preloader--logo__ring" viewBox="0 0 260 260" aria-hidden>
          <circle className="aw-preloader--logo__track" cx={CX} cy={CY} r={R} />
          <circle
            className="aw-preloader--logo__progress"
            cx={CX}
            cy={CY}
            r={R}
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div className="aw-preloader--logo__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/athletic-wolf-wordmark.png"
            alt="Athletic Wolf"
            width={224}
            height={72}
          />
        </div>
      </div>

      <p className="aw-preloader--logo__label">Loading</p>
    </div>
  );
}
