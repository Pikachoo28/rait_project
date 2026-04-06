import {
  dataSourceTypes,
  measurementFrequencies,
  thresholdDirections,
  MetricFormErrors,
  MetricFormValues
} from "@/types/metric";

import { InlineRadioGroup } from "@/components/ui/InlineRadioGroup";
import { NumberField } from "@/components/ui/NumberField";
import { SectionCard } from "@/components/ui/SectionCard";
import { SelectField } from "@/components/ui/SelectField";
import { ThresholdIndicator } from "@/components/wizard/ThresholdIndicator";

import { InputField } from "@/components/ui/InputField";

interface MeasurementConfigStepProps {
  values: MetricFormValues["measurementConfig"];
  errors: MetricFormErrors["measurementConfig"];
  onChange: <TField extends keyof MetricFormValues["measurementConfig"]>(
    field: TField,
    value: MetricFormValues["measurementConfig"][TField]
  ) => void;
}

export const MeasurementConfigStep = ({
  values,
  errors,
  onChange
}: MeasurementConfigStepProps) => (
  <SectionCard
    title="Step 2: Measurement Configuration"
    description="Describe where the metric data comes from, how often it is refreshed, and what threshold range determines acceptable performance."
  >
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField
        label="Data source type"
        required
        value={values.dataSourceType}
        error={errors.dataSourceType}
        onChange={(value) => onChange("dataSourceType", value)}
        options={dataSourceTypes.map((dataSourceType) => ({
          label: dataSourceType,
          value: dataSourceType
        }))}
      />
      <SelectField
        label="Measurement frequency"
        required
        value={values.measurementFrequency}
        error={errors.measurementFrequency}
        onChange={(value) => onChange("measurementFrequency", value)}
        options={measurementFrequencies.map((measurementFrequency) => ({
          label: measurementFrequency,
          value: measurementFrequency
        }))}
      />
      <div className="md:col-span-2">
        <InlineRadioGroup
          label="Threshold direction"
          required
          value={values.thresholdDirection}
          error={errors.thresholdDirection}
          onChange={(value) => onChange("thresholdDirection", value)}
          options={thresholdDirections.map((direction) => ({
            label: direction === "higher" ? "Higher is better" : "Lower is better",
            value: direction
          }))}
        />
      </div>
      <NumberField
        label={values.thresholdDirection === "higher" ? "Minimum acceptable value" : "Maximum acceptable value"}
        required
        value={values.minimumValue}
        error={errors.minimumValue}
        onChange={(value) => onChange("minimumValue", value)}
      />
      <NumberField
        label="Target value"
        required
        value={values.targetValue}
        error={errors.targetValue}
        onChange={(value) => onChange("targetValue", value)}
      />
      <InputField
        label="Unit of measurement"
        required
        placeholder="score, rate, percentage, coverage"
        value={values.unit}
        error={errors.unit}
        onChange={(event) => onChange("unit", event.target.value)}
      />
      <div className="rounded-3xl border border-border/40 bg-canvas/70 p-4 text-sm text-ink/70">
        The threshold indicator below visualises the configured acceptable threshold and the desired
        target in a simple product-oriented way.
      </div>
      <div className="md:col-span-2">
        <ThresholdIndicator
          direction={values.thresholdDirection}
          minimumValue={values.minimumValue}
          targetValue={values.targetValue}
          unit={values.unit}
        />
      </div>
    </div>
  </SectionCard>
);
