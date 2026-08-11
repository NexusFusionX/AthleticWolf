const GEO_COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "x-geo-country",
] as const;

export function getCountryCodeFromRequest(request: Request) {
  for (const header of GEO_COUNTRY_HEADERS) {
    const value = request.headers.get(header)?.trim().toUpperCase();
    if (isGeoCountryCode(value)) {
      return value;
    }
  }

  return null;
}

export function isGeoCountryCode(value: string | null | undefined) {
  return Boolean(value && /^[A-Z]{2}$/.test(value) && value !== "XX");
}
