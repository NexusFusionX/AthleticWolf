import { NextResponse } from "next/server";
import { getLiveUsdExchangeRates } from "@/app/lib/live-fx";

export async function GET() {
  const fx = await getLiveUsdExchangeRates();

  return NextResponse.json(
    {
      base: "USD",
      source: fx.source,
      fetchedAt: fx.fetchedAt,
      rates: fx.rates,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}
