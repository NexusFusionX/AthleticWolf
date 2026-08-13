"use client";

import { useEffect, useState } from "react";
import { findCountryByCode } from "@/app/data/countries";

const STORAGE_KEY = "aw_visitor_country";
const MANUAL_KEY = "aw_visitor_country_manual";

function readStoredCountry() {
  if (typeof window === "undefined") return "";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)?.trim().toUpperCase();
    if (stored && findCountryByCode(stored)) return stored;
  } catch {
    // ignore storage failures
  }
  return "";
}

function isManualCountryChoice() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(MANUAL_KEY) === "1";
  } catch {
    return false;
  }
}

function readQueryCountry() {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    const raw =
      params.get("country")?.trim().toUpperCase() ||
      params.get("currencyCountry")?.trim().toUpperCase() ||
      "";
    if (raw && findCountryByCode(raw)) return raw;
  } catch {
    // ignore
  }
  return "";
}

export function persistVisitorCountry(
  countryCode: string,
  options?: { manual?: boolean }
) {
  const normalized = countryCode.trim().toUpperCase();
  if (!normalized || !findCountryByCode(normalized)) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, normalized);
    if (options?.manual) {
      window.localStorage.setItem(MANUAL_KEY, "1");
    }
  } catch {
    // ignore storage failures
  }
}

export function clearVisitorCountryPreference() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(MANUAL_KEY);
  } catch {
    // ignore
  }
}

async function lookupCountryInBrowser() {
  // Prefer providers that see the browser/VPN egress IP.
  const endpoints = [
    "https://ipwho.is/",
    "https://ipapi.co/json/",
  ] as const;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) continue;
      const data = (await response.json()) as {
        country_code?: string;
        countryCode?: string;
        success?: boolean;
      };
      if (data.success === false) continue;
      const code = (data.country_code || data.countryCode || "")
        .trim()
        .toUpperCase();
      if (code && findCountryByCode(code)) return code;
    } catch {
      // Try next provider.
    }
  }

  return null;
}

export function useVisitorCountry() {
  const [countryCode, setCountryCode] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      // Fastest test path: ?country=US or ?country=AU
      const fromQuery = readQueryCountry();
      if (fromQuery) {
        if (!cancelled) {
          setCountryCode(fromQuery);
          persistVisitorCountry(fromQuery);
          setReady(true);
        }
        return;
      }

      const stored = readStoredCountry();
      const manual = isManualCountryChoice();

      // Manual checkout country always wins.
      if (manual && stored) {
        if (!cancelled) {
          setCountryCode(stored);
          setReady(true);
        }
        return;
      }

      if (stored && !cancelled) {
        setCountryCode(stored);
      }

      // Browser/VPN IP first (Chrome VPN extensions only affect browser traffic).
      // Server geo on localhost often still sees Pakistan ISP IP.
      let detected = (await lookupCountryInBrowser()) || "";

      if ((!detected || !findCountryByCode(detected)) && !cancelled) {
        try {
          const response = await fetch("/api/geo/country");
          if (response.ok) {
            const data: { countryCode?: string | null } = await response.json();
            detected = data.countryCode?.trim().toUpperCase() ?? "";
          }
        } catch {
          // keep previous detection
        }
      }

      if (cancelled) return;

      if (detected && findCountryByCode(detected)) {
        setCountryCode(detected);
        persistVisitorCountry(detected);
      }

      setReady(true);
    }

    void detect();

    return () => {
      cancelled = true;
    };
  }, []);

  return { countryCode: countryCode || "US", ready };
}
