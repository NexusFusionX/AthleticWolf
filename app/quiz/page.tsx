import type { Metadata } from "next";
import { Suspense } from "react";
import { QuizWizard } from "./QuizWizard";

export const metadata: Metadata = {
  title: "Find Your Training Plan | Athletic Wolf",
  description:
    "Quick assessment to match you with the right Athletic Wolf coaching plan.",
};

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizWizard />
    </Suspense>
  );
}
