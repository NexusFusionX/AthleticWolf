import {
  Barbell,
  CalendarCheck,
  ChatCircle,
  Check,
  ForkKnife,
} from "@phosphor-icons/react";
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
      <ul className="process-mini-status-list">
        <li className="process-mini-status-list__item process-mini-status-list__item--done">
          Goals reviewed
        </li>
        <li className="process-mini-status-list__item process-mini-status-list__item--active">
          Workout plan
        </li>
        <li className="process-mini-status-list__item">Meal guidance</li>
        <li className="process-mini-status-list__item">Check-in schedule</li>
      </ul>
      <p className="process-mini-note-box process-mini-fill-bottom">
        Your coach delivers within 24–48 hours
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
        <li>
          <CalendarCheck size={12} aria-hidden />
          Weekly check-ins
        </li>
        <li>
          <ChatCircle size={12} aria-hidden />
          Coach support
        </li>
      </ul>
      <div className="process-mini-fill-bottom">
        <div className="process-mini-pill">Week 1 · Upper body</div>
        <div className="process-mini-workout">
          <p className="process-mini-workout__title">Today&apos;s session</p>
          <p className="process-mini-workout__item">Bench press · 4 x 8</p>
          <p className="process-mini-workout__item">Incline DB · 3 x 10</p>
          <p className="process-mini-workout__item">Cable fly · 3 x 12</p>
        </div>
      </div>
    </ProcessMiniScreen>
  );
}
