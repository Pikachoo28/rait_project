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
  <div className="grid gap-4 rounded-4xl border border-border/40 bg-surface/90 p-5 shadow-panel lg:grid-cols-[2fr_1fr_1fr]">
    <InputField
      label="Search by metric name"
      placeholder="Search Responsible AI metrics"
      value={filters.search}
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
      label="Status"
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
);
