export type LeadFormData = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  fitnessStatus: string;
  hardestPart: string;
  work: string;
  incomeRange: string;
  openToInvest: string;
  instagram: string;
};

export type LeadFormField =
  | {
      name: keyof LeadFormData;
      label: string;
      type: "text" | "email" | "tel" | "textarea";
      required?: boolean;
      placeholder?: string;
      half?: boolean;
    }
  | {
      name: keyof LeadFormData;
      label: string;
      type: "radio";
      required?: boolean;
      options: { value: string; label: string }[];
    };

export type LeadFormStep = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  fields: LeadFormField[];
};

export const LEAD_FORM_STEPS: LeadFormStep[] = [
  {
    id: "contact",
    label: "Contact",
    title: "Personal contact information",
    subtitle: "7 questions · No card needed",
    fields: [
      {
        name: "firstName",
        label: "First name",
        type: "text",
        required: true,
        half: true,
        placeholder: "First name",
      },
      {
        name: "lastName",
        label: "Last name",
        type: "text",
        required: true,
        half: true,
        placeholder: "Last name",
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "tel",
        required: true,
        placeholder: "WhatsApp / phone number",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "you@email.com",
      },
    ],
  },
  {
    id: "fitness-status",
    label: "Status",
    title: "Where are you right now?",
    fields: [
      {
        name: "fitnessStatus",
        label: "Where are you right now?",
        type: "radio",
        required: true,
        options: [
          { value: "I don't train at all", label: "I don't train at all" },
          {
            value: "I train but I have no plan",
            label: "I train but I have no plan",
          },
          {
            value: "I follow a plan and I'm stuck",
            label: "I follow a plan and I'm stuck",
          },
          {
            value: "I was in shape before and I lost it",
            label: "I was in shape before and I lost it",
          },
        ],
      },
    ],
  },
  {
    id: "hardest-part",
    label: "Challenge",
    title: "What's the hardest part right now?",
    fields: [
      {
        name: "hardestPart",
        label: "What's the hardest part right now?",
        type: "radio",
        required: true,
        options: [
          {
            value: "I'm skinny and can't put size on",
            label: "I'm skinny and can't put size on",
          },
          {
            value: "I carry fat I can't shift",
            label: "I carry fat I can't shift",
          },
          {
            value: "I'm training hard and nothing changes",
            label: "I'm training hard and nothing changes",
          },
          {
            value: "I start well, then I fall off",
            label: "I start well, then I fall off",
          },
        ],
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    title: "What do you do for work?",
    subtitle: "So coach can build the program around your week",
    fields: [
      {
        name: "work",
        label: "What do you do for work?",
        type: "textarea",
        required: true,
        placeholder: "Job, schedule, shift work, student…",
      },
    ],
  },
  {
    id: "income",
    label: "Income",
    title: "What's your income range at the moment?",
    subtitle:
      "So we can understand your schedule better and build the program around what you do",
    fields: [
      {
        name: "incomeRange",
        label: "What's your income range at the moment?",
        type: "radio",
        required: true,
        options: [
          {
            value: "I'm not earning right now",
            label: "I'm not earning right now",
          },
          {
            value: "Under $1,000 a month",
            label: "Under $1,000 a month",
          },
          {
            value: "$1,000 to $3,000 a month",
            label: "$1,000 to $3,000 a month",
          },
          {
            value: "$3,000 to $5,000 a month",
            label: "$3,000 to $5,000 a month",
          },
          {
            value: "$5,000 to $10,000 a month",
            label: "$5,000 to $10,000 a month",
          },
          {
            value: "More than $10,000 a month",
            label: "More than $10,000 a month",
          },
        ],
      },
    ],
  },
  {
    id: "invest",
    label: "Invest",
    title:
      "Are you open to investing in your health and starting Athletic Wolf 1-on-1 coaching?",
    fields: [
      {
        name: "openToInvest",
        label:
          "Are you open to investing in your health and starting Athletic Wolf 1-on-1 coaching?",
        type: "radio",
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    title: "What's your Instagram handle?",
    subtitle: "So we can reach you there.",
    fields: [
      {
        name: "instagram",
        label: "Instagram handle",
        type: "text",
        required: true,
        placeholder: "@yourhandle",
      },
    ],
  },
];

export const EMPTY_LEAD_FORM: LeadFormData = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  fitnessStatus: "",
  hardestPart: "",
  work: "",
  incomeRange: "",
  openToInvest: "",
  instagram: "",
};

export const LEAD_FIELD_LABELS: Record<keyof LeadFormData, string> = {
  firstName: "First name",
  lastName: "Last name",
  mobile: "Mobile",
  email: "Email",
  fitnessStatus: "Where are you right now?",
  hardestPart: "Hardest part right now",
  work: "Work",
  incomeRange: "Income range",
  openToInvest: "Open to investing in coaching",
  instagram: "Instagram",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isLeadStepComplete(
  step: LeadFormStep,
  data: LeadFormData
): boolean {
  return step.fields.every((field) => {
    if (!field.required) return true;
    const value = data[field.name].trim();
    if (!value) return false;
    if (field.type === "email") return EMAIL_PATTERN.test(value);
    if (field.name === "mobile") return value.replace(/\D/g, "").length >= 7;
    return true;
  });
}

export function isLeadFormComplete(data: LeadFormData): boolean {
  return LEAD_FORM_STEPS.every((step) => isLeadStepComplete(step, data));
}

export type LeadRecord = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  fitness_status: string;
  hardest_part: string;
  work: string;
  income_range: string;
  open_to_invest: string;
  instagram: string;
  raw_json?: LeadFormData | Record<string, unknown> | null;
};

export function leadToFormData(lead: LeadRecord): LeadFormData {
  const raw = lead.raw_json;
  if (raw && typeof raw === "object" && "firstName" in raw) {
    return { ...EMPTY_LEAD_FORM, ...(raw as LeadFormData) };
  }
  return {
    firstName: lead.first_name,
    lastName: lead.last_name,
    mobile: lead.mobile,
    email: lead.email,
    fitnessStatus: lead.fitness_status,
    hardestPart: lead.hardest_part,
    work: lead.work,
    incomeRange: lead.income_range,
    openToInvest: lead.open_to_invest,
    instagram: lead.instagram,
  };
}

export function leadDisplayRows(data: LeadFormData) {
  return (Object.keys(LEAD_FIELD_LABELS) as (keyof LeadFormData)[]).map(
    (key) => ({
      key,
      label: LEAD_FIELD_LABELS[key],
      value: data[key] || "—",
    })
  );
}
