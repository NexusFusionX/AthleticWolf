import type { ReactNode } from "react";

type ProcessAppScreenProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  compact?: boolean;
};

export function ProcessAppScreen({
  eyebrow,
  title,
  children,
  compact = true,
}: ProcessAppScreenProps) {
  const headerPad = compact ? "px-3 py-3" : "px-8 py-7";
  const bodyPad = compact ? "p-3" : "p-8";
  const titleClass = compact
    ? "font-display mt-1 text-sm leading-tight"
    : "font-display mt-1.5 text-3xl sm:text-4xl";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-premium">
      <div className={`bg-ink text-white ${headerPad}`}>
        <p className={`font-display ${compact ? "text-[10px]" : "text-lg"}`}>
          Athletic<span className="text-accent">Wolf</span>
        </p>
        <p
          className={`mt-2 font-semibold uppercase tracking-[0.16em] text-accent ${
            compact ? "text-[8px]" : "text-sm"
          }`}
        >
          {eyebrow}
        </p>
        <h3 className={titleClass}>{title}</h3>
      </div>
      <div className={bodyPad}>{children}</div>
    </div>
  );
}
