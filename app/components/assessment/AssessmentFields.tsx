"use client";

import type { ComponentType } from "react";
import {
  Flame,
  Barbell,
  PersonSimpleRun,
  Heart,
  TrendUp,
  Trophy,
  ArrowsClockwise,
  CalendarBlank,
  CalendarCheck,
  CalendarPlus,
  Sun,
  Buildings,
  House,
  BoundingBox,
  Person,
  ForkKnife,
  Leaf,
  Lightning,
  Plant,
  Tree,
  Path,
  Clock,
  MapPin,
  Question,
  type IconProps,
} from "@phosphor-icons/react";
import type {
  AssessmentField,
  AssessmentFormValue,
  AssessmentIconKey,
} from "@/app/lib/assessment-steps";

const ICON_MAP: Record<AssessmentIconKey, ComponentType<IconProps>> = {
  flame: Flame,
  barbell: Barbell,
  "person-simple-run": PersonSimpleRun,
  heart: Heart,
  seedling: Plant,
  "trend-up": TrendUp,
  trophy: Trophy,
  "arrows-clockwise": ArrowsClockwise,
  "calendar-blank": CalendarBlank,
  "calendar-check": CalendarCheck,
  "calendar-plus": CalendarPlus,
  sun: Sun,
  buildings: Buildings,
  house: House,
  "bounding-box": BoundingBox,
  person: Person,
  "fork-knife": ForkKnife,
  leaf: Leaf,
  lightning: Lightning,
  tree: Tree,
  path: Path,
  clock: Clock,
  "map-pin": MapPin,
  question: Question,
};

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
  if (compact) {
    return (
      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.name}>
            <p className="mb-1 text-[10px] font-semibold">{field.label}</p>
            <div className="rounded-lg border border-line px-2 py-2 text-[10px]">
              {(formData[field.name] as string) ||
                ("placeholder" in field ? field.placeholder : undefined) ||
                "…"}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const singleQuestion = fields.length === 1;

  return (
    <div className="assessment-pro-fields">
      {fields.map((field) => {
        const id = `assessment-${field.name}`;

        return (
          <div key={field.name} className="assessment-pro-fields__block">
            <label
              className={`assessment-pro-fields__label${
                singleQuestion ? " assessment-pro-fields__label--hero" : ""
              }`}
              htmlFor={
                field.type === "radio" || field.type === "checkbox"
                  ? undefined
                  : id
              }
            >
              {field.label}
              {field.required ? (
                <span className="assessment-pro-fields__req" aria-hidden>
                  *
                </span>
              ) : (
                <span className="assessment-pro-fields__opt">Optional</span>
              )}
            </label>
            {"help" in field && field.help ? (
              <p className="assessment-pro-fields__help">{field.help}</p>
            ) : null}

            {(field.type === "text" ||
              field.type === "email" ||
              field.type === "number") && (
              <div className="assessment-pro-fields__input-wrap">
                <input
                  id={id}
                  type={field.type}
                  inputMode={field.type === "number" ? "decimal" : undefined}
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
                  autoComplete={
                    field.name === "name"
                      ? "name"
                      : field.type === "email"
                        ? "email"
                        : undefined
                  }
                  className={`assessment-pro-fields__input${
                    errors[field.name]
                      ? " assessment-pro-fields__input--error"
                      : ""
                  }`}
                  aria-invalid={errors[field.name] ? true : undefined}
                />
                {field.unit ? (
                  <span className="assessment-pro-fields__unit">{field.unit}</span>
                ) : null}
              </div>
            )}

            {field.type === "textarea" && (
              <textarea
                id={id}
                value={(formData[field.name] as string) ?? ""}
                onChange={
                  preview
                    ? undefined
                    : (e) => onSetValue?.(field.name, e.target.value)
                }
                placeholder={field.placeholder}
                rows={5}
                readOnly={preview}
                className="assessment-pro-fields__input assessment-pro-fields__textarea"
                aria-invalid={errors[field.name] ? true : undefined}
              />
            )}

            {(field.type === "radio" || field.type === "checkbox") && (
              <div
                className={`assessment-pro-fields__choices${
                  field.chips ? " assessment-pro-fields__choices--chips" : ""
                }${field.twoCol ? " assessment-pro-fields__choices--two" : ""}`}
                role={field.type === "radio" ? "radiogroup" : "group"}
                aria-label={field.label}
              >
                {(maxOptions
                  ? field.options.slice(0, maxOptions)
                  : field.options
                ).map((opt) => {
                  const selected =
                    field.type === "checkbox"
                      ? ((formData[field.name] as string[]) ?? []).includes(
                          opt.value
                        )
                      : formData[field.name] === opt.value;
                  const Icon = opt.icon ? ICON_MAP[opt.icon] : null;

                  return (
                    <label
                      key={opt.value}
                      className={`assessment-pro-fields__choice${
                        field.chips
                          ? " assessment-pro-fields__choice--chip"
                          : ""
                      }${
                        selected
                          ? " assessment-pro-fields__choice--selected"
                          : ""
                      }${!Icon ? " assessment-pro-fields__choice--plain" : ""}`}
                    >
                      <input
                        type={field.type}
                        name={field.name}
                        value={opt.value}
                        checked={selected}
                        onChange={() =>
                          field.type === "checkbox"
                            ? onToggleCheckbox?.(field.name, opt.value)
                            : onSetValue?.(field.name, opt.value)
                        }
                        className="sr-only"
                        disabled={preview}
                      />
                      {Icon ? (
                        <span
                          className="assessment-pro-fields__icon"
                          aria-hidden
                        >
                          <Icon
                            size={20}
                            weight={selected ? "fill" : "regular"}
                          />
                        </span>
                      ) : null}
                      <span className="assessment-pro-fields__choice-copy">
                        <span className="assessment-pro-fields__choice-label">
                          {opt.label}
                        </span>
                        {opt.hint ? (
                          <span className="assessment-pro-fields__choice-hint">
                            {opt.hint}
                          </span>
                        ) : null}
                      </span>
                      {!field.chips ? (
                        <span
                          className={`assessment-pro-fields__tick assessment-pro-fields__tick--${
                            field.type === "checkbox" ? "box" : "radio"
                          }`}
                          aria-hidden
                        />
                      ) : null}
                    </label>
                  );
                })}
              </div>
            )}

            {errors[field.name] && "error" in field && field.error ? (
              <p className="assessment-pro-fields__error" role="alert">
                {field.error}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
