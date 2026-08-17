"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

const HIDDEN_PREFIXES = [
  "/checkout",
  "/auth/",
  "/dashboard",
  "/admin",
  "/quiz",
  "/thank-you",
] as const;

export function ConditionalSiteFooter() {
  const pathname = usePathname();

  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix)
  );

  if (hidden) return null;

  return <SiteFooter />;
}
