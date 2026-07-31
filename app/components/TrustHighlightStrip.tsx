import Link from "next/link";
import type { TrustHighlightItem } from "@/app/lib/trust-highlights";
import { DEFAULT_TRUST_HIGHLIGHTS } from "@/app/lib/trust-highlights";

type TrustHighlightStripProps = {
  items?: TrustHighlightItem[];
  className?: string;
};

export function TrustHighlightStrip({
  items = DEFAULT_TRUST_HIGHLIGHTS,
  className = "",
}: TrustHighlightStripProps) {
  return (
    <section
      className={`trust-highlight-strip px-6 sm:px-8 ${className}`.trim()}
      aria-label="Why train with Athletic Wolf"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className="trust-highlight-strip__icon" aria-hidden>
                <Icon size={20} weight="duotone" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
                  {item.description}
                </span>
              </span>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="trust-highlight-strip__card trust-highlight-strip__card--link"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={item.title} className="trust-highlight-strip__card">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
