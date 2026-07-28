"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  attachPackageToAssessment,
  checkoutHref,
  isValidCompletedAssessment,
  quizHref,
} from "@/app/lib/assessment";

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
  const router = useRouter();
  const [href, setHref] = useState(quizHref(packageName));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function resolveHref() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (isValidCompletedAssessment(user?.id)) {
        setHref(checkoutHref(packageName));
      } else {
        setHref(quizHref(packageName));
      }
    }

    resolveHref();
  }, [packageName]);

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id ?? userId;

    if (!isValidCompletedAssessment(id)) return;

    event.preventDefault();
    attachPackageToAssessment(packageName);
    router.push(checkoutHref(packageName));
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
