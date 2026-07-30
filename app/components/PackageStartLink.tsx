import Link from "next/link";
import { checkoutHref } from "@/app/lib/assessment";

type PackageStartLinkProps = {
  packageName: string;
  className?: string;
  children: React.ReactNode;
};

export function PackageStartLink({
  packageName,
  className,
  children,
}: PackageStartLinkProps) {
  return (
    <Link href={checkoutHref(packageName)} className={className}>
      {children}
    </Link>
  );
}
