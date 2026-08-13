import { USD_EXCHANGE_RATES } from "@/app/data/currency-rates";

type FxCache = {
  rates: Record<string, number>;
  fetchedAt: number;
  source: "live" | "fallback";
};

const FX_TTL_MS = 60 * 60 * 1000; // refresh about every hour
let memoryCache: FxCache | null = null;

function mergeWithFallback(live: Record<string, number>): Record<string, number> {
  return {
    ...USD_EXCHANGE_RATES,
    ...live,
    USD: 1,
  };
}

async function fetchOpenErApiRates() {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("open_er_api_failed");

  const data = (await response.json()) as {
    result?: string;
    rates?: Record<string, number>;
  };

  if (data.result !== "success" || !data.rates) {
    throw new Error("open_er_api_invalid");
  }

  const normalized: Record<string, number> = {};
  for (const [code, rate] of Object.entries(data.rates)) {
    if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) {
      normalized[code.toUpperCase()] = rate;
    }
  }

  return normalized;
}

/**
 * Live USD→currency rates with ~1 hour cache.
 * Falls back to fixed rates in currency-rates.ts if the network fails.
 */
export async function getLiveUsdExchangeRates(): Promise<FxCache> {
  if (memoryCache && Date.now() - memoryCache.fetchedAt < FX_TTL_MS) {
    return memoryCache;
  }

  try {
    const live = await fetchOpenErApiRates();
    memoryCache = {
      rates: mergeWithFallback(live),
      fetchedAt: Date.now(),
      source: "live",
    };
    return memoryCache;
  } catch {
    memoryCache = {
      rates: { ...USD_EXCHANGE_RATES, USD: 1 },
      fetchedAt: Date.now(),
      source: "fallback",
    };
    return memoryCache;
  }
}

export function getRateFromUsd(
  currencyCode: string,
  rates: Record<string, number> = USD_EXCHANGE_RATES
) {
  const code = currencyCode.trim().toUpperCase();
  if (code === "USD") return 1;
  return rates[code] ?? USD_EXCHANGE_RATES[code] ?? 1;
}
