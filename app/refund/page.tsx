import type { Metadata } from "next";
import { LegalPage } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | Athletic Wolf",
  description:
    "Athletic Wolf refund and cancellation policy for coaching packages.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      subtitle="Last updated: July 24, 2026. Please read this carefully before purchasing a coaching package."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">1. Overview</h2>
        <p>
          Athletic Wolf coaching packages are digital services that include
          personalized programming, support, and ongoing coach time. Because work
          begins quickly after purchase, refunds are limited as described below.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">2. Package structure</h2>
        <p>
          Our packages are sold as 6-month coaching packages and billed monthly
          unless otherwise stated at checkout. Buying a package means you are
          committing to the coaching term shown at purchase.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">3. Refund eligibility</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Before plan delivery:</strong> If
            you cancel before your custom plan has been delivered, contact us
            within 24 hours of purchase and we will review a full refund of the
            first payment where no coaching work has started.
          </li>
          <li>
            <strong className="text-foreground">After plan delivery:</strong> Once
            your personalized plan has been delivered or coaching support has
            started, payments are generally non-refundable.
          </li>
          <li>
            <strong className="text-foreground">Duplicate / billing errors:</strong>{" "}
            Accidental duplicate charges or clear billing mistakes will be
            corrected.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">4. Cancellations</h2>
        <p>
          To cancel future billing or request an early end to coaching, email{" "}
          <a href="mailto:hello@athleticwolf.com" className="text-accent hover:text-accent-light">
            hello@athleticwolf.com
          </a>
          . Cancellation stops future charges according to our billing cycle; it
          does not automatically refund amounts already paid unless covered above.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">5. How to request a refund</h2>
        <p>
          Email{" "}
          <a href="mailto:hello@athleticwolf.com" className="text-accent hover:text-accent-light">
            hello@athleticwolf.com
          </a>{" "}
          with your full name, account email, package name, and purchase date.
          We aim to respond within 2–3 business days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">6. Exceptions</h2>
        <p>
          If service was not provided due to an issue on our side, we will work
          with you on a fair remedy, which may include a replacement plan,
          extended coaching time, or a partial/full refund at our discretion.
        </p>
      </section>
    </LegalPage>
  );
}
