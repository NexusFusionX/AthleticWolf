export const ASSESSMENT_KEY = "athletic-wolf-pending-assessment";

export type PendingAssessment = {
  package: string | null;
  formData: Record<string, unknown>;
  completedAt?: string;
  userId?: string;
};

export function readPendingAssessment(): PendingAssessment | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(ASSESSMENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PendingAssessment;
    if (!parsed?.formData || typeof parsed.formData !== "object") return null;

    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingAssessment() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ASSESSMENT_KEY);
}

export function savePendingAssessment(assessment: PendingAssessment) {
  localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(assessment));
}

export function attachPackageToAssessment(
  packageName: string,
): PendingAssessment | null {
  const existing = readPendingAssessment();
  if (!existing) return null;

  const updated: PendingAssessment = { ...existing, package: packageName };
  savePendingAssessment(updated);
  return updated;
}

function hasRequiredAnswers(formData: Record<string, unknown>) {
  const name = formData.name;
  const goal = formData.goal;
  const email = formData.email;

  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof goal === "string" &&
    goal.trim() !== "" &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );
}

/** Assessment counts as done only for the signed-in user who submitted it. */
export function isValidCompletedAssessment(userId?: string | null): boolean {
  if (!userId) return false;

  const assessment = readPendingAssessment();
  if (!assessment?.completedAt || assessment.userId !== userId) return false;

  return hasRequiredAnswers(assessment.formData);
}

export function hasCompletedAssessment(userId?: string | null): boolean {
  return isValidCompletedAssessment(userId);
}

export function checkoutHref(packageName: string) {
  return `/checkout?package=${encodeURIComponent(packageName)}`;
}

export function quizHref(packageName?: string) {
  if (!packageName) return "/quiz";
  return `/quiz?package=${encodeURIComponent(packageName)}`;
}

export function packageStartHref(packageName: string, userId?: string | null) {
  if (isValidCompletedAssessment(userId)) return checkoutHref(packageName);
  return quizHref(packageName);
}
