"use client";

import { metricCategories, metricStatuses, MetricFilterState } from "@/types/metric";

import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";

interface MetricsFilterBarProps {
  filters: MetricFilterState;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: MetricFilterState["category"]) => void;
  onStatusChange: (value: MetricFilterState["status"]) => void;
}

export const MetricsFilterBar = ({
  filters,
  onSearchChange,
  onCategoryChange,
  onStatusChange
}: MetricsFilterBarProps) => (
  <div className="rounded-[2rem] border border-border/20 bg-surface/85 p-5 shadow-panel backdrop-blur-sm">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
          Filter metrics
        </p>
        <p className="mt-1 text-sm text-ink/65">
          Narrow the library by metric name, governance domain, or lifecycle state.
        </p>
      </div>
    </div>
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
      <InputField
        label="Search metrics"
        placeholder="Search by name or owner"
        value={filters.search}
        hint="Use search when a reviewer needs one metric fast."
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <SelectField
        label="Category"
        value={filters.category}
        onChange={onCategoryChange}
        options={[
          { label: "All categories", value: "all" },
          ...metricCategories.map((category) => ({
            label: category,
            value: category
          }))
        ]}
      />
      <SelectField
        label="Lifecycle status"
        value={filters.status}
        onChange={onStatusChange}
        options={[
          { label: "All statuses", value: "all" },
          ...metricStatuses.map((status) => ({
            label: status[0].toUpperCase() + status.slice(1),
            value: status
          }))
        ]}
      />
    </div>
  </div>
);
