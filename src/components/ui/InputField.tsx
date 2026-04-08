import { InputHTMLAttributes, useId } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const InputField = ({
  label,
  error,
  hint,
  required,
  className = "",
  ...props
}: InputFieldProps) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </span>
      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        className={`w-full rounded-[1.1rem] border bg-surface px-4 py-3 text-sm text-ink outline-none transition duration-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 ${
          error ? "border-danger/60 bg-rose-500/5" : "border-border/25"
        } ${className}`}
      />
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
