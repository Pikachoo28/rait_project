import { useId } from "react";

import { MetricSignalTone } from "@/lib/metricHealth";

interface RangeFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min: number;
  max: number;
  step: number;
  error?: string;
  hint?: string;
  required?: boolean;
  tone?: MetricSignalTone;
}

const accentClassNames: Record<MetricSignalTone, string> = {
  good: "accent-emerald-500",
  warning: "accent-amber-500",
  critical: "accent-rose-500",
  neutral: "accent-sky-500"
};

export const RangeField = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  error,
  hint,
  required,
  tone = "neutral"
}: RangeFieldProps) => {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const displayValue = value ?? 0;

  return (
    <label
      htmlFor={fieldId}
      className={`block rounded-[1.75rem] border p-4 ${
        error ? "border-rose-500/40 bg-rose-500/5" : "border-border/25 bg-surfaceAlt/65"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-ink">
          {label}
          {required ? <span className="ml-1 text-danger">*</span> : null}
        </span>
        <span className="rounded-full border border-border/20 bg-surface px-3 py-1 text-sm font-semibold text-ink shadow-sm">
          {displayValue}
        </span>
      </div>
      <input
        id={fieldId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200/80 ${accentClassNames[tone]}`}
      />
      <div className="mt-3">
        <input
          type="number"
          value={value ?? ""}
          onChange={(event) =>
            onChange(event.target.value === "" ? null : Number(event.target.value))
          }
          className={`w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 ${
            error ? "border-rose-500/50" : "border-border/25"
          }`}
        />
      </div>
      {error ? (
        <span id={errorId} className="mt-2 block text-sm text-danger">
          {error}
        </span>
      ) : null}
      {!error && hint ? (
        <span id={hintId} className="mt-2 block text-sm text-ink/60">
          {hint}
        </span>
      ) : null}
    </label>
  );
};
