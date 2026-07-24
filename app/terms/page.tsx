import type { Metadata } from "next";
import { LegalPage } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Athletic Wolf",
  description:
    "Terms and conditions for using Athletic Wolf coaching services and website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Last updated: July 24, 2026. By using athleticwolf.com or purchasing coaching, you agree to these terms."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">1. Agreement</h2>
        <p>
          These Terms &amp; Conditions govern your use of the Athletic Wolf
          website and coaching services. If you do not agree, please do not use
          the site or purchase a package.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">2. Services</h2>
        <p>
          Athletic Wolf provides online personal training and nutrition coaching.
          Results vary by individual. We do not guarantee specific weight loss,
          muscle gain, or performance outcomes. Coaching is educational and
          supportive, not medical treatment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">3. Accounts</h2>
        <p>
          You are responsible for keeping your login details secure and for
          activity under your account. Provide accurate assessment information so
          we can coach you safely and effectively.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">4. Payments</h2>
        <p>
          Package pricing is shown at checkout. By completing a purchase you
          authorize the listed charges for the selected package term. Refunds and
          cancellations are handled under our{" "}
          <a href="/refund" className="text-accent hover:text-accent-light">
            Refund Policy
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">5. Client responsibilities</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Follow coaching guidance within your own ability and medical limits</li>
          <li>Disclose injuries, medical conditions, or restrictions during intake</li>
          <li>Consult a doctor before starting a new training or nutrition program when needed</li>
          <li>Do not share your customized plans with others for commercial use</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">6. Intellectual property</h2>
        <p>
          Website content, branding, and your delivered coaching materials remain
          owned by Athletic Wolf (or respective rights holders). You receive a
          personal, non-transferable license to use your plan for your own
          training.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">7. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, Athletic Wolf is not liable for
          indirect or consequential damages arising from use of the site or
          coaching. Our total liability for any claim related to a purchase is
          limited to the amount you paid for the relevant package period.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">8. Privacy</h2>
        <p>
          How we handle personal data is described in our{" "}
          <a href="/privacy" className="text-accent hover:text-accent-light">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">9. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href="mailto:hello@athleticwolf.com" className="text-accent hover:text-accent-light">
            hello@athleticwolf.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
