import jsPDF from "jspdf";

interface PlanData {
  [key: string]: string;
}

export function generatePlanPDF(planData: PlanData, customerName: string, packageName: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Colors (matching Athletic Wolf brand)
  const accentColorRGB = { r: 255, g: 102, b: 51 }; // Orange/Accent
  const darkColorRGB = { r: 31, g: 41, b: 55 }; // Dark ink
  const textColorRGB = { r: 100, g: 116, b: 139 }; // Muted text

  // Header with branding
  doc.setFillColor(31, 41, 55); // Dark background
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("ATHLETIC", 20, 20);
  doc.setTextColor(255, 102, 51);
  doc.text("WOLF", 70, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("PERSONALIZED COACHING PLAN", 20, 32);

  yPosition = 55;

  // Customer info section
  doc.setTextColor(darkColorRGB.r, darkColorRGB.g, darkColorRGB.b);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Your Information", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${customerName}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Package: ${packageName}`, 20, yPosition);
  yPosition += 15;

  // Weekly Workout Schedule
  doc.setTextColor(darkColorRGB.r, darkColorRGB.g, darkColorRGB.b);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Weekly Workout Schedule", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
  doc.setFont("helvetica", "normal");

  const workoutDays = [
    { key: "mondayWorkout", label: "Monday" },
    { key: "tuesdayWorkout", label: "Tuesday" },
    { key: "wednesdayWorkout", label: "Wednesday" },
    { key: "thursdayWorkout", label: "Thursday" },
    { key: "fridayWorkout", label: "Friday" },
    { key: "saturdayWorkout", label: "Saturday" },
    { key: "sundayWorkout", label: "Sunday" },
  ];

  workoutDays.forEach((day) => {
    const value = planData[day.key] || "—";
    doc.text(`${day.label}: ${value}`, 20, yPosition);
    yPosition += 6;
  });

  yPosition += 8;

  // Nutrition Plan
  doc.setTextColor(darkColorRGB.r, darkColorRGB.g, darkColorRGB.b);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Nutrition Plan", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
  doc.setFont("helvetica", "normal");

  const nutritionFields = [
    { key: "dailyCalories", label: "Daily Calorie Target" },
    { key: "proteinGrams", label: "Protein" },
    { key: "carbsGrams", label: "Carbs" },
    { key: "fatsGrams", label: "Fats" },
    { key: "mealFrequency", label: "Meal Frequency" },
    { key: "supplements", label: "Supplements" },
  ];

  nutritionFields.forEach((field) => {
    const value = planData[field.key] || "—";
    // Handle multi-line values (supplements)
    if (value.includes(", ")) {
      const lines = value.split(", ");
      doc.text(`${field.label}: ${lines[0]}`, 20, yPosition);
      yPosition += 6;
      lines.slice(1).forEach((line) => {
        doc.text(`  • ${line}`, 20, yPosition);
        yPosition += 5;
      });
    } else {
      doc.text(`${field.label}: ${value}`, 20, yPosition);
      yPosition += 6;
    }
  });

  yPosition += 8;

  // Check if we need a new page
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  // Goals & Progress
  doc.setTextColor(darkColorRGB.r, darkColorRGB.g, darkColorRGB.b);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Goals & Progress", 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setTextColor(textColorRGB.r, textColorRGB.g, textColorRGB.b);
  doc.setFont("helvetica", "normal");

  const goalFields = [
    { key: "primaryGoal", label: "Primary Goal" },
    { key: "targetWeight", label: "Target Weight" },
    { key: "checkInFrequency", label: "Check-in Frequency" },
    { key: "progressMetrics", label: "Progress Metrics" },
    { key: "adjustmentTriggers", label: "Adjustment Triggers" },
  ];

  goalFields.forEach((field) => {
    const value = planData[field.key] || "—";
    // Handle multi-line values
    if (value.includes(", ")) {
      const lines = value.split(", ");
      doc.text(`${field.label}: ${lines[0]}`, 20, yPosition);
      yPosition += 6;
      lines.slice(1).forEach((line) => {
        doc.text(`  • ${line}`, 20, yPosition);
        yPosition += 5;
      });
    } else {
      doc.text(`${field.label}: ${value}`, 20, yPosition);
      yPosition += 6;
    }
  });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} | Athletic Wolf Coaching`,
    20,
    pageHeight - 10
  );

  // Download
  doc.save("Athletic_Wolf_Coaching_Plan.pdf");
}
