import { SelectHTMLAttributes, useId } from "react";

interface SelectOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface SelectFieldProps<TValue extends string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  label: string;
  value: TValue;
  options: ReadonlyArray<SelectOption<TValue>>;
  error?: string;
  hint?: string;
  onChange: (value: TValue) => void;
}

export const SelectField = <TValue extends string>({
  label,
  value,
  options,
  error,
  hint,
  required,
  onChange,
  className = "",
  ...props
}: SelectFieldProps<TValue>) => {
  const selectId = useId();
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <label className="block" htmlFor={selectId}>
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </span>
      <select
        {...props}
        id={selectId}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        className={`w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
          error ? "border-danger" : "border-border/30"
        } ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
