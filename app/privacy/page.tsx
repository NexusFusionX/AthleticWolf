import type { Metadata } from "next";
import { LegalPage } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Athletic Wolf",
  description:
    "How Athletic Wolf collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Last updated: July 24, 2026. This policy explains how Athletic Wolf handles your information."
    >
      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">1. Who we are</h2>
        <p>
          Athletic Wolf (“we”, “us”, “our”) provides online personal training and
          nutrition coaching. Contact:{" "}
          <a href="mailto:hello@athleticwolf.com" className="text-accent hover:text-accent-light">
            hello@athleticwolf.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">2. Information we collect</h2>
        <p>We may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Account details such as name, email, and login information</li>
          <li>Assessment answers about goals, schedule, equipment, and preferences</li>
          <li>Payment-related details processed by our payment providers</li>
          <li>Messages you send through our site, forms, or AI assistant</li>
          <li>Basic usage data such as pages visited and device/browser type</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">3. How we use your information</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>To create and deliver your coaching plans and check-ins</li>
          <li>To manage your account, packages, and support requests</li>
          <li>To improve our website, coaching process, and AI assistant responses</li>
          <li>To send service updates related to your coaching (not spam)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">4. Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with trusted
          providers who help us operate (for example hosting, authentication,
          analytics, payment processing, or AI tooling), only as needed to run
          Athletic Wolf. We may also disclose information if required by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">5. Data storage &amp; security</h2>
        <p>
          We use reputable infrastructure providers and reasonable safeguards to
          protect your data. No online service is 100% secure, so please use a
          strong unique password for your account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">6. Your choices</h2>
        <p>
          You can request access, correction, or deletion of your personal data by
          emailing{" "}
          <a href="mailto:hello@athleticwolf.com" className="text-accent hover:text-accent-light">
            hello@athleticwolf.com
          </a>
          . Some records may be retained where needed for legal, billing, or
          security reasons.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground sm:text-2xl">7. Updates</h2>
        <p>
          We may update this Privacy Policy from time to time. The “Last updated”
          date at the top will change when we do. Continued use of the site after
          updates means you accept the revised policy.
        </p>
      </section>
    </LegalPage>
  );
}
