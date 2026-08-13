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

export function getClientIpFromRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return null;
}

function isPublicIp(ip: string) {
  if (ip === "::1" || ip === "127.0.0.1") return false;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("127.")) {
    return false;
  }
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return false;
  return true;
}

/**
 * Fallback when CDN country headers are missing (common on localhost).
 */
export async function lookupCountryFromIp(ip?: string | null) {
  const endpoints =
    ip && isPublicIp(ip)
      ? [
          `https://ipapi.co/${encodeURIComponent(ip)}/country_code/`,
          `https://ipwho.is/${encodeURIComponent(ip)}`,
        ]
      : ["https://ipapi.co/country_code/", "https://ipwho.is/"];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: { Accept: "application/json, text/plain" },
        cache: "no-store",
      });
      clearTimeout(timeout);

      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = (await response.json()) as {
          country_code?: string;
          countryCode?: string;
          success?: boolean;
        };
        if (data.success === false) continue;
        const code = (data.country_code || data.countryCode || "")
          .trim()
          .toUpperCase();
        if (isGeoCountryCode(code)) return code;
      } else {
        const text = (await response.text()).trim().toUpperCase();
        if (isGeoCountryCode(text)) return text;
      }
    } catch {
      // Try the next provider.
    }
  }

  return null;
}
