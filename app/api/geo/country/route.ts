import { NextResponse } from "next/server";
import { getCountryCodeFromRequest } from "@/app/lib/geo-country";
import { findCountryByCode } from "@/app/data/countries";

export async function GET(request: Request) {
  const detectedCode = getCountryCodeFromRequest(request);

  if (!detectedCode || !findCountryByCode(detectedCode)) {
    return NextResponse.json({ countryCode: null });
  }

  return NextResponse.json({ countryCode: detectedCode });
}
