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
      <legend className="mb-3 block text-sm font-medium text-ink">Lifecycle status</legend>
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
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                  checked
                    ? "border-sky-500/30 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "border-border/25 bg-surfaceAlt/80 text-ink/75 hover:border-sky-500/30 hover:text-ink"
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
