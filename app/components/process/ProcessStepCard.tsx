import type { ReactNode } from "react";
import { ProcessPhoneFrame } from "./ProcessPhoneFrame";

export type ProcessStepScreen = {
  key: string;
  node: ReactNode;
};

export type ProcessStepCardProps = {
  step: string;
  title: string;
  lead: string;
  detail?: string;
  points: readonly string[];
  screens: readonly ProcessStepScreen[];
  variant?: "compact" | "detailed";
};

export function ProcessStepCard({
  step,
  title,
  lead,
  detail,
  points,
  screens,
  variant = "compact",
}: ProcessStepCardProps) {
  const cardClass =
    variant === "detailed" ? "how-it-works-step" : "kickoff-card";

  return (
    <article className={cardClass}>
      <div className={variant === "detailed" ? "how-it-works-step__copy" : "kickoff-card__copy"}>
        <span
          className={
            variant === "detailed" ? "how-it-works-step__badge" : "kickoff-card__step"
          }
        >
          Step {step}
        </span>
        <h3
          className={
            variant === "detailed" ? "how-it-works-step__title" : "kickoff-card__title"
          }
        >
          {title}
        </h3>
        <p
          className={
            variant === "detailed" ? "how-it-works-step__lead" : "kickoff-card__lead"
          }
        >
          {lead}
        </p>
        {detail ? (
          <p className="how-it-works-step__detail">{detail}</p>
        ) : null}
        <ul
          className={
            variant === "detailed" ? "how-it-works-step__points" : "kickoff-card__points"
          }
        >
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div
        className={
          variant === "detailed" ? "how-it-works-step__screens" : "kickoff-card__screens"
        }
        aria-hidden
        inert
      >
        {screens.map((screen) => (
          <ProcessPhoneFrame key={screen.key}>{screen.node}</ProcessPhoneFrame>
        ))}
      </div>
    </article>
  );
}
