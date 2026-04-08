import { useId } from "react";

interface SelectableChipOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface SelectableChipGroupProps<TValue extends string> {
  label: string;
  values: TValue[];
  options: ReadonlyArray<SelectableChipOption<TValue>>;
  onToggle: (value: TValue) => void;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const SelectableChipGroup = <TValue extends string>({
  label,
  values,
  options,
  onToggle,
  error,
  hint,
  required
}: SelectableChipGroupProps<TValue>) => {
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const hintId = `${groupId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = values.includes(option.value);

          return (
            <label key={option.value} className="cursor-pointer">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggle(option.value)}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "border-sky-500/30 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "border-border/25 bg-surfaceAlt/80 text-ink hover:border-sky-500/30"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
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
    </fieldset>
  );
};
