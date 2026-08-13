import { NextResponse } from "next/server";
import {
  getClientIpFromRequest,
  getCountryCodeFromRequest,
  lookupCountryFromIp,
} from "@/app/lib/geo-country";
import { findCountryByCode } from "@/app/data/countries";
import {
  getCheckoutCurrencyCode,
  getStripeChargeCurrencyCode,
} from "@/app/lib/checkout-currency";

function payload(countryCode: string | null) {
  if (!countryCode || !findCountryByCode(countryCode)) {
    return {
      countryCode: null,
      currency: "USD",
      chargeCurrency: "USD",
    };
  }

  return {
    countryCode,
    currency: getCheckoutCurrencyCode(countryCode),
    chargeCurrency: getStripeChargeCurrencyCode(countryCode),
  };
}

export async function GET(request: Request) {
  const fromHeader = getCountryCodeFromRequest(request);
  if (fromHeader && findCountryByCode(fromHeader)) {
    return NextResponse.json(payload(fromHeader));
  }

  const ip = getClientIpFromRequest(request);
  const fromIp = await lookupCountryFromIp(ip);
  if (fromIp && findCountryByCode(fromIp)) {
    return NextResponse.json(payload(fromIp));
  }

  return NextResponse.json(payload(null));
}
