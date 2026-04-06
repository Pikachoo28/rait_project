import { useId } from "react";

interface InlineRadioOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface InlineRadioGroupProps<TValue extends string> {
  label: string;
  value: TValue;
  options: ReadonlyArray<InlineRadioOption<TValue>>;
  onChange: (value: TValue) => void;
  error?: string;
  required?: boolean;
}

export const InlineRadioGroup = <TValue extends string>({
  label,
  value,
  options,
  onChange,
  error,
  required
}: InlineRadioGroupProps<TValue>) => {
  const groupId = useId();
  const errorId = `${groupId}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : null}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const checked = option.value === value;

          return (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name={groupId}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  checked
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-ink hover:border-accent"
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
    </fieldset>
  );
};
