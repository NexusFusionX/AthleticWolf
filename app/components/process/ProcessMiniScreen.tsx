import type { ReactNode } from "react";

type ProcessMiniScreenProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function ProcessMiniScreen({
  eyebrow,
  title,
  children,
}: ProcessMiniScreenProps) {
  return (
    <div className="process-mini-screen">
      <p className="process-mini-screen__eyebrow">{eyebrow}</p>
      <h4 className="process-mini-screen__title">{title}</h4>
      <div className="process-mini-screen__body">{children}</div>
    </div>
  );
}
