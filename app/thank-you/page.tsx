import { Suspense } from "react";
import { ThankYouContent } from "@/app/components/ThankYouContent";

export const metadata = {
  title: "Thank You | Athletic Wolf",
  description: "Your Athletic Wolf application is in — we're creating your plan.",
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
