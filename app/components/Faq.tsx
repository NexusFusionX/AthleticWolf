import Link from "next/link";
import { CaretDown, Lightning } from "@phosphor-icons/react/dist/ssr";
import { AccentHeading } from "./AccentHeading";
import { faqs } from "../data/faqs";

type FaqProps = {
  showIntro?: boolean;
  className?: string;
};

function FaqList() {
  return (
    <div className="faq-list">
      {faqs.map((item) => (
        <details key={item.q} className="faq-item group">
          <summary className="faq-item__summary">
            <span className="faq-item__question">{item.q}</span>
            <span className="faq-item__toggle" aria-hidden>
              <CaretDown size={14} weight="bold" className="faq-item__chevron" />
            </span>
          </summary>
          <div className="faq-item__answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function Faq({ showIntro = false, className = "" }: FaqProps) {
  if (!showIntro) {
    return (
      <div className={className}>
        <FaqList />
      </div>
    );
  }

  return (
    <div className={`faq-section ${className}`.trim()}>
      <aside className="faq-section__intro">
        <p className="faq-section__eyebrow">FAQ</p>
        <AccentHeading
          before="QUICK"
          accent="ANSWERS"
          className="faq-section__title font-display"
        />
        <p className="faq-section__desc">
          Everything you need to know before you start coaching.
        </p>
        <Link href="#packages" className="faq-section__cta btn btn-accent">
          <span className="faq-section__cta-label">
            Get Started
            <Lightning size={16} weight="fill" aria-hidden />
          </span>
        </Link>
        <p className="faq-section__ai-link">
          Have a specific question?{" "}
          <Link href="/faq" className="text-accent hover:text-accent-light">
            Ask our AI assistant →
          </Link>
        </p>
      </aside>

      <FaqList />
    </div>
  );
}
