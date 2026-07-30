import { packages } from "@/app/data/packages";
import { getCheckoutAmountCents } from "@/lib/stripe";

export type PackageChangeType = "upgrade" | "downgrade" | "same";

export function findPackageByName(name: string) {
  return packages.find((item) => item.name === name);
}

export function getPackageChangeType(
  currentPackageName: string,
  nextPackageName: string
): PackageChangeType | null {
  const current = findPackageByName(currentPackageName);
  const next = findPackageByName(nextPackageName);

  if (!current || !next) return null;
  if (current.name === next.name) return "same";
  if (next.price > current.price) return "upgrade";
  if (next.price < current.price) return "downgrade";
  return "same";
}

export function getUpgradeDifferenceCents(
  currentPackageName: string,
  nextPackageName: string
) {
  const current = findPackageByName(currentPackageName);
  const next = findPackageByName(nextPackageName);

  if (!current || !next) return null;

  const difference = next.price - current.price;
  if (difference <= 0) return null;

  return getCheckoutAmountCents(difference);
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}
