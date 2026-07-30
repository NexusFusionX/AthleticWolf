import { ProcessMiniScreen } from "./ProcessMiniScreen";

function MiniField({ label }: { label: string }) {
  return (
    <div className="process-mini-field">
      <span className="process-mini-field__label">{label}</span>
      <span className="process-mini-field__input" aria-hidden />
    </div>
  );
}

export function ProcessPreviewSignUp() {
  return (
    <ProcessMiniScreen eyebrow="Account" title="Create account">
      <MiniField label="Email" />
      <MiniField label="Password" />
      <div className="process-mini-cta">Sign up</div>
    </ProcessMiniScreen>
  );
}

export function ProcessPreviewSignIn() {
  return (
    <ProcessMiniScreen eyebrow="Account" title="Sign in">
      <MiniField label="Email" />
      <MiniField label="Password" />
      <div className="process-mini-cta">Log in</div>
    </ProcessMiniScreen>
  );
}
