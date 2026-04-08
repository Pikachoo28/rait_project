import {
  aiSystemTypes,
  metricCategories,
  MetricFormErrors,
  MetricFormValues
} from "@/types/metric";

import { InputField } from "@/components/ui/InputField";
import { SectionCard } from "@/components/ui/SectionCard";
import { SelectableChipGroup } from "@/components/ui/SelectableChipGroup";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";

interface BasicDetailsStepProps {
  values: MetricFormValues["basicDetails"];
  errors: MetricFormErrors["basicDetails"];
  onChange: <TField extends keyof MetricFormValues["basicDetails"]>(
    field: TField,
    value: MetricFormValues["basicDetails"][TField]
  ) => void;
}

export const BasicDetailsStep = ({ values, errors, onChange }: BasicDetailsStepProps) => {
  const toggleSystemType = (systemType: (typeof aiSystemTypes)[number]) => {
    const nextValues = values.applicableSystemTypes.includes(systemType)
      ? values.applicableSystemTypes.filter((item) => item !== systemType)
      : [...values.applicableSystemTypes, systemType];

    onChange("applicableSystemTypes", nextValues);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <SectionCard
        title="Basic information"
        description="Define the metric name, governance category, and the language reviewers will read."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            label="Metric name"
            required
            placeholder="Hallucination Rate"
            value={values.name}
            hint="Use the exact label stakeholders will search for."
            error={errors.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
          <SelectField
            label="Category"
            required
            value={values.category}
            error={errors.category}
            onChange={(value) => onChange("category", value)}
            options={metricCategories.map((category) => ({
              label: category,
              value: category
            }))}
          />
          <div className="md:col-span-2">
            <TextareaField
              label="Description"
              placeholder="Describe what the metric measures, why it matters, and how it should be interpreted during review."
              value={values.description}
              hint="Keep this operational, short, and decision-oriented."
              error={errors.description}
              onChange={(event) => onChange("description", event.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <div className="space-y-6">
        <SectionCard
          title="System coverage"
          description="Mark the AI system types this metric applies to."
        >
          <SelectableChipGroup
            label="Applicable AI system types"
            required
            values={values.applicableSystemTypes}
            error={errors.applicableSystemTypes}
            hint="Pick every system family that should inherit this metric."
            onToggle={toggleSystemType}
            options={aiSystemTypes.map((systemType) => ({
              label: systemType,
              value: systemType
            }))}
          />
        </SectionCard>

        <SectionCard
          title="Preview"
          description="A quick read of how this metric will appear in the dashboard."
        >
          <div className="rounded-[1.75rem] border border-border/20 bg-surfaceAlt/75 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              Metric label
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {values.name || "Metric name"}
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Category
            </p>
            <p className="mt-2 text-sm font-medium text-ink/75">{values.category}</p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Description
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              {values.description || "The short explanation will appear here during review."}
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
