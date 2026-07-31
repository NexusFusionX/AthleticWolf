"use client";

import { usePathname } from "next/navigation";
import { TrustHighlightStrip } from "./TrustHighlightStrip";
import { pathHasCustomTrustStrip } from "@/app/lib/trust-highlights";

export function SiteFooterTrust() {
  const pathname = usePathname();

  if (pathHasCustomTrustStrip(pathname)) {
    return null;
  }

  return <TrustHighlightStrip className="mt-10" />;
}
