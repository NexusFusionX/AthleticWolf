import type { ReactNode } from "react";

type ProcessPhoneFrameProps = {
  children: ReactNode;
  label?: string;
};

export function ProcessPhoneFrame({ children, label }: ProcessPhoneFrameProps) {
  return (
    <div className="process-phone" aria-hidden>
      {label && <span className="process-phone__label">{label}</span>}
      <div className="process-phone__device">
        <div className="process-phone__notch" />
        <div className="process-phone__screen">{children}</div>
      </div>
    </div>
  );
}
