"use client";

import { KeyboardEvent, useId, useState } from "react";

import { validateEmailAddress } from "@/lib/validation/metricForm";

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export const TagInput = ({
  label,
  values,
  onChange,
  error,
  required,
  placeholder = "Type an email and press Enter"
}: TagInputProps) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const draftErrorId = `${inputId}-draft-error`;
  const [draftValue, setDraftValue] = useState("");
  const [draftError, setDraftError] = useState<string>("");

  const commitDraftValue = () => {
    const nextValue = draftValue.trim();

    if (!nextValue) {
      return;
    }

    const validationError = validateEmailAddress(nextValue);

    if (validationError) {
      setDraftError(validationError);
      return;
    }

    if (!values.includes(nextValue)) {
      onChange([...values, nextValue]);
    }

    setDraftValue("");
    setDraftError("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraftValue();
    }

    if (event.key === "Backspace" && !draftValue && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const removeValue = (value: string) => {
    onChange(values.filter((item) => item !== value));
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </label>
      <div
        className={`rounded-[1.1rem] border bg-surface px-3 py-3 ${
          error || draftError ? "border-danger/60 bg-rose-500/5" : "border-border/25"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300"
            >
              {value}
              <button
                type="button"
                onClick={() => removeValue(value)}
                className="text-sky-700/70 transition hover:text-sky-700 dark:text-sky-300/70 dark:hover:text-sky-300"
                aria-label={`Remove ${value}`}
              >
                x
              </button>
            </span>
          ))}
          <input
            id={inputId}
            value={draftValue}
            aria-invalid={error || draftError ? "true" : "false"}
            aria-describedby={draftError ? draftErrorId : error ? errorId : undefined}
            onChange={(event) => {
              setDraftValue(event.target.value);
              if (draftError) {
                setDraftError("");
              }
            }}
            onBlur={commitDraftValue}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-w-60 flex-1 border-none bg-transparent px-2 py-1 text-sm outline-none"
          />
        </div>
      </div>
      {draftError ? (
        <span id={draftErrorId} className="mt-2 block text-sm text-danger">
          {draftError}
        </span>
      ) : null}
      {!draftError && error ? (
        <span id={errorId} className="mt-2 block text-sm text-danger">
          {error}
        </span>
      ) : null}
    </div>
  );
};
