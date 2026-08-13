"use client";

import { useEffect, useState } from "react";
import { USD_EXCHANGE_RATES } from "@/app/data/currency-rates";

type FxState = {
  rates: Record<string, number>;
  source: "live" | "fallback" | "loading";
  ready: boolean;
};

let shared: FxState = {
  rates: { ...USD_EXCHANGE_RATES, USD: 1 },
  source: "loading",
  ready: false,
};

let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

async function loadRates() {
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const response = await fetch("/api/fx/rates", { cache: "no-store" });
      if (!response.ok) throw new Error("fx_fetch_failed");
      const data = (await response.json()) as {
        rates?: Record<string, number>;
        source?: "live" | "fallback";
      };
      if (!data.rates) throw new Error("fx_invalid");

      shared = {
        rates: { ...USD_EXCHANGE_RATES, ...data.rates, USD: 1 },
        source: data.source ?? "live",
        ready: true,
      };
    } catch {
      shared = {
        rates: { ...USD_EXCHANGE_RATES, USD: 1 },
        source: "fallback",
        ready: true,
      };
    } finally {
      inflight = null;
      notify();
    }
  })();

  return inflight;
}

export function useLiveFxRates() {
  const [state, setState] = useState<FxState>(shared);

  useEffect(() => {
    const sync = () => setState({ ...shared });
    listeners.add(sync);
    void loadRates();
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return state;
}
