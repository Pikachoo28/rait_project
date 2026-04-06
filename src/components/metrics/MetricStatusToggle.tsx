import { useId } from "react";

import { metricStatuses, MetricStatus } from "@/types/metric";

interface MetricStatusToggleProps {
  value: MetricStatus;
  onChange: (status: MetricStatus) => void;
}

export const MetricStatusToggle = ({ value, onChange }: MetricStatusToggleProps) => {
  const groupId = useId();

  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-ink">Metric status</legend>
      <div className="flex flex-wrap gap-3">
        {metricStatuses.map((status) => {
          const checked = status === value;

          return (
            <label key={status} className="cursor-pointer">
              <input
                type="radio"
                name={groupId}
                value={status}
                checked={checked}
                onChange={() => onChange(status)}
                className="sr-only"
              />
              <span
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
                  checked
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-ink hover:border-accent"
                }`}
              >
                {status}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
