import {
  Barbell,
  CalendarBlank,
  CalendarCheck,
  ChatCircle,
  Check,
  ForkKnife,
  Lightning,
  MapPin,
} from "@phosphor-icons/react";
import { ProcessMiniScreen } from "./ProcessMiniScreen";

export function ProcessPreviewPlanBuilding() {
  return (
    <ProcessMiniScreen eyebrow="Building" title="Creating your plan">
      <div className="process-mini-progress" aria-hidden>
        <span className="process-mini-progress__ring">44%</span>
      </div>
      <p className="process-mini-caption process-mini-caption--center">
        Personalized program in progress
      </p>
      <ul className="process-mini-status-list">
        <li className="process-mini-status-list__item process-mini-status-list__item--done">
          Analysing your fitness goal
        </li>
        <li className="process-mini-status-list__item process-mini-status-list__item--done">
          Calculating your training level
        </li>
        <li className="process-mini-status-list__item process-mini-status-list__item--active">
          Adapting to your training location
        </li>
        <li className="process-mini-status-list__item">Building weekly schedule</li>
      </ul>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewPlanReady() {
  return (
    <ProcessMiniScreen eyebrow="Ready" title="Your plan is ready">
      <p className="process-mini-caption">
        Built around your goal, schedule, and training setup.
      </p>
      <div className="process-mini-ready-grid">
        <div className="process-mini-ready-card process-mini-ready-card--wide">
          <Lightning size={14} weight="fill" aria-hidden />
          <span>Build muscle and get stronger</span>
        </div>
        <div className="process-mini-ready-card">
          <MapPin size={14} weight="fill" aria-hidden />
          <span>At gym</span>
        </div>
        <div className="process-mini-ready-card">
          <CalendarBlank size={14} weight="fill" aria-hidden />
          <span>3 days / week</span>
        </div>
      </div>
      <div className="process-mini-fill-bottom">
        <div className="process-mini-pill">Coach delivery · 24–48 hrs</div>
      </div>
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
