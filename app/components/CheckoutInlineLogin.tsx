"use client";

type CheckoutInlineLoginProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onCreateAccountClick: () => void;
};

export function CheckoutInlineLogin({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onCreateAccountClick,
}: CheckoutInlineLoginProps) {
  return (
    <section className="checkout-section">
      <div className="checkout-section__head">
        <h2 className="checkout-section__title">Sign in</h2>
        <p className="checkout-section__subtitle">
          Log in to continue checkout with your existing account.
        </p>
      </div>

      <div className="checkout-account">
        {error ? (
          <p className="checkout-account__error">{error}</p>
        ) : null}

        <label className="checkout-contact__field">
          <span>Email</span>
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

        <label className="checkout-contact__field">
          <span>Password</span>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="btn btn-accent w-full px-8 py-3.5 text-base font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="checkout-account__signin text-sm text-muted">
          New here?{" "}
          <button
            type="button"
            onClick={onCreateAccountClick}
            className="text-accent hover:text-accent-light"
          >
            Create an account
          </button>
        </p>
      </div>
    </section>
  );
}
