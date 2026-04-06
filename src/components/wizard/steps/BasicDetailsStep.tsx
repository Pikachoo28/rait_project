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
    <SectionCard
      title="Step 1: Basic Details"
      description="Define the Responsible AI metric, the governance category it belongs to, and the AI systems it applies to."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          label="Metric name"
          required
          placeholder="Hallucination Rate"
          value={values.name}
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
            placeholder="Describe what the metric measures, why it matters, and how teams use it in Responsible AI review workflows."
            value={values.description}
            error={errors.description}
            onChange={(event) => onChange("description", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <SelectableChipGroup
            label="Applicable AI system types"
            required
            values={values.applicableSystemTypes}
            error={errors.applicableSystemTypes}
            onToggle={toggleSystemType}
            options={aiSystemTypes.map((systemType) => ({
              label: systemType,
              value: systemType
            }))}
          />
        </div>
      </div>
    </SectionCard>
  );
};
