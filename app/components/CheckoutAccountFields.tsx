"use client";

type CheckoutAccountFieldsProps = {
  email: string;
  password: string;
  hideEmail?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignInClick: () => void;
};

export function CheckoutAccountFields({
  email,
  password,
  hideEmail = false,
  onEmailChange,
  onPasswordChange,
  onSignInClick,
}: CheckoutAccountFieldsProps) {
  return (
    <section className="checkout-section">
      <div className="checkout-section__head">
        <h2 className="checkout-section__title">Account</h2>
        <p className="checkout-section__subtitle">
          {hideEmail
            ? "Choose a password for your new account."
            : "Create your login to access your coaching dashboard."}
        </p>
      </div>

      <div className="checkout-account">
        {hideEmail ? (
          <p className="checkout-account__linked-email text-sm text-muted">
            Account email: <strong className="text-foreground">{email}</strong>
          </p>
        ) : (
          <label className="checkout-contact__field">
            <span>Your email *</span>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
        )}

        <label className="checkout-contact__field">
          <span>Password *</span>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>

        <p className="checkout-account__signin text-sm text-muted">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSignInClick}
            className="text-accent hover:text-accent-light"
          >
            Sign in
          </button>
        </p>
      </div>
    </section>
  );
}
