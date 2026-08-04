import type { ReactNode } from "react";

type ProcessPhoneFrameProps = {
  children: ReactNode;
  label?: string;
};

export function ProcessPhoneFrame({
  children,
  label = "Preview",
}: ProcessPhoneFrameProps) {
  return (
    <div className="process-phone" aria-hidden>
      <span className="process-phone__label">{label}</span>
      <div className="process-phone__device">
        <div className="process-phone__chrome">
          <span className="process-phone__speaker" />
          <span className="process-phone__camera" />
        </div>
        <div className="process-phone__screen">{children}</div>
        <div className="process-phone__home" />
      </div>
    </div>
  );
}
