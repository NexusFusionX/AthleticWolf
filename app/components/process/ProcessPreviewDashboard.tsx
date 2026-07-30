import { Barbell, Check, ForkKnife } from "@phosphor-icons/react";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

export function ProcessPreviewPlanBuilding() {
  return (
    <ProcessMiniScreen eyebrow="Your coach" title="Building plan">
      <div className="process-mini-progress" aria-hidden>
        <span className="process-mini-progress__ring">72%</span>
      </div>
      <p className="process-mini-caption process-mini-caption--center">
        Custom program in progress
      </p>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewDashboard() {
  return (
    <ProcessMiniScreen eyebrow="Dashboard" title="Start training">
      <div className="process-mini-badge">Plan ready</div>
      <ul className="process-mini-checklist">
        <li>
          <Check size={12} weight="bold" aria-hidden />
          Workouts
        </li>
        <li>
          <Barbell size={12} aria-hidden />
          Track progress
        </li>
        <li>
          <ForkKnife size={12} aria-hidden />
          Nutrition
        </li>
      </ul>
    </ProcessMiniScreen>
  );
}
