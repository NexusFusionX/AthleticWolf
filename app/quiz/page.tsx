import type { Metadata } from "next";
import { Suspense } from "react";
import { QuizWizard } from "./QuizWizard";

export const metadata: Metadata = {
  title: "Intake Assessment | Athletic Wolf",
  description:
    "Complete your post-checkout intake assessment so your coach can build your personalized plan.",
};

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizWizard />
    </Suspense>
  );
}
