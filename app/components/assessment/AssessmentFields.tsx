import type {
  AssessmentField,
  AssessmentFormValue,
} from "@/app/lib/assessment-steps";

type AssessmentFieldsProps = {
  fields: AssessmentField[];
  formData: Record<string, AssessmentFormValue>;
  errors?: Record<string, boolean>;
  compact?: boolean;
  preview?: boolean;
  maxOptions?: number;
  onSetValue?: (name: string, value: AssessmentFormValue) => void;
  onToggleCheckbox?: (name: string, value: string) => void;
};

export function AssessmentFields({
  fields,
  formData,
  errors = {},
  compact = false,
  preview = false,
  maxOptions,
  onSetValue,
  onToggleCheckbox,
}: AssessmentFieldsProps) {
  const labelClass = compact
    ? "mb-1.5 block text-[10px] font-semibold leading-snug"
    : "mb-2.5 block text-sm font-semibold";
  const inputClass = compact
    ? "w-full rounded-lg border bg-surface px-2.5 py-2 text-[10px] outline-none"
    : "w-full rounded-xl border bg-surface px-3.5 py-3 text-sm outline-none transition-colors";
  const optionClass = compact
    ? "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[10px]"
    : "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors";
  const indicatorClass = compact ? "h-3 w-3 shrink-0 border-2" : "h-[18px] w-[18px] shrink-0 border-2";
  const gapClass = compact ? "flex flex-col gap-3" : "flex flex-col gap-7";

  return (
    <div className={gapClass}>
      {fields.map((field) => (
        <div key={field.name}>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="ml-0.5 text-accent">*</span>}
          </label>

          {(field.type === "text" ||
            field.type === "email" ||
            field.type === "number") && (
            <input
              type={field.type}
              value={(formData[field.name] as string) ?? ""}
              onChange={
                preview
                  ? undefined
                  : (e) => onSetValue?.(field.name, e.target.value)
              }
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              readOnly={preview}
              tabIndex={preview ? -1 : undefined}
              aria-hidden={preview}
              className={`${inputClass} ${
                errors[field.name]
                  ? "border-error"
                  : preview
                    ? "border-line"
                    : "border-line focus:border-accent"
              }`}
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={(formData[field.name] as string) ?? ""}
              onChange={
                preview
                  ? undefined
                  : (e) => onSetValue?.(field.name, e.target.value)
              }
              placeholder={field.placeholder}
              rows={compact ? 2 : 3}
              readOnly={preview}
              tabIndex={preview ? -1 : undefined}
              aria-hidden={preview}
              className={`${inputClass} resize-y border-line`}
            />
          )}

          {(field.type === "radio" || field.type === "checkbox") && (
            <div
              className={`grid gap-2 ${field.twoCol && !compact ? "sm:grid-cols-2" : ""}`}
            >
              {(maxOptions
                ? field.options.slice(0, maxOptions)
                : field.options
              ).map((opt) => {
                const isChecked =
                  field.type === "checkbox"
                    ? ((formData[field.name] as string[]) ?? []).includes(opt.value)
                    : formData[field.name] === opt.value;

                if (preview) {
                  return (
                    <div
                      key={opt.value}
                      aria-hidden
                      className={`${optionClass} ${
                        isChecked
                          ? "border-accent bg-accent/10"
                          : "border-line bg-surface"
                      }`}
                    >
                      <span
                        className={`${indicatorClass} ${
                          field.type === "checkbox" ? "rounded-[4px]" : "rounded-full"
                        } ${
                          isChecked
                            ? "border-accent bg-accent shadow-[inset_0_0_0_2px_#fff]"
                            : "border-line"
                        }`}
                      />
                      <span className={isChecked ? "font-semibold" : ""}>
                        {opt.label}
                      </span>
                    </div>
                  );
                }

                return (
                  <label
                    key={opt.value}
                    className={`${optionClass} cursor-pointer ${
                      isChecked
                        ? "border-accent bg-accent/10"
                        : "border-line bg-surface hover:border-accent/60"
                    }`}
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      checked={isChecked}
                      onChange={() =>
                        field.type === "checkbox"
                          ? onToggleCheckbox?.(field.name, opt.value)
                          : onSetValue?.(field.name, opt.value)
                      }
                      className="sr-only"
                    />
                    <span
                      className={`${indicatorClass} ${
                        field.type === "checkbox" ? "rounded-[5px]" : "rounded-full"
                      } ${
                        isChecked
                          ? "border-accent bg-accent shadow-[inset_0_0_0_3px_#fff]"
                          : "border-line"
                      }`}
                    />
                    <span className={isChecked ? "font-semibold" : ""}>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {errors[field.name] && "error" in field && field.error && (
            <p className={`mt-2 text-error ${compact ? "text-[9px]" : "text-xs"}`}>
              {field.error}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
