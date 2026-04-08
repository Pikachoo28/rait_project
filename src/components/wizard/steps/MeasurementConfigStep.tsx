import {
  dataSourceTypes,
  measurementFrequencies,
  thresholdDirections,
  MetricFormErrors,
  MetricFormValues
} from "@/types/metric";

import {
  getMetricPreviewValue,
  getThresholdAssessment
} from "@/lib/metricHealth";
import { InlineRadioGroup } from "@/components/ui/InlineRadioGroup";
import { RangeField } from "@/components/ui/RangeField";
import { SectionCard } from "@/components/ui/SectionCard";
import { SelectField } from "@/components/ui/SelectField";
import { ThresholdBar } from "@/components/metrics/ThresholdBar";

import { InputField } from "@/components/ui/InputField";

interface MeasurementConfigStepProps {
  values: MetricFormValues["measurementConfig"];
  errors: MetricFormErrors["measurementConfig"];
  onChange: <TField extends keyof MetricFormValues["measurementConfig"]>(
    field: TField,
    value: MetricFormValues["measurementConfig"][TField]
  ) => void;
}

const getSliderBounds = (minimumValue: number | null, targetValue: number | null) => {
  const highestValue = Math.max(minimumValue ?? 0, targetValue ?? 0, 1);

  return {
    min: 0,
    max: highestValue <= 1 ? 1 : Math.ceil(highestValue * 1.4 * 10) / 10,
    step: highestValue <= 1 ? 0.005 : 0.1
  };
};

export const MeasurementConfigStep = ({
  values,
  errors,
  onChange
}: MeasurementConfigStepProps) => {
  const previewValue = getMetricPreviewValue(
    values.minimumValue,
    values.targetValue
  );
  const previewAssessment = getThresholdAssessment({
    direction: values.thresholdDirection,
    minimumValue: values.minimumValue,
    targetValue: values.targetValue,
    currentValue: previewValue
  });
  const sliderBounds = getSliderBounds(values.minimumValue, values.targetValue);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Measurement source"
          description="Capture where the metric comes from and how frequently it refreshes."
        >
          <div className="grid gap-5">
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
            <InputField
              label="Unit of measurement"
              required
              placeholder="score, rate, percentage, coverage"
              value={values.unit}
              error={errors.unit}
              hint="This label appears beside live values and thresholds."
              onChange={(event) => onChange("unit", event.target.value)}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Signal behavior"
          description="Set whether high values are good or low values are good."
        >
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
          <div className="mt-5 rounded-[1.75rem] border border-border/20 bg-surfaceAlt/75 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              Live feedback
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {previewAssessment.label}
            </p>
            <p className="mt-2 text-sm text-ink/65">
              The preview line updates as you move the threshold and target sliders.
            </p>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Threshold controls"
        description="Use the sliders to define the guardrail and target. The bar updates in real time."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <RangeField
            label={
              values.thresholdDirection === "higher"
                ? "Minimum acceptable value"
                : "Maximum acceptable value"
            }
            required
            value={values.minimumValue}
            error={errors.minimumValue}
            hint="This is the red-to-amber boundary."
            min={sliderBounds.min}
            max={sliderBounds.max}
            step={sliderBounds.step}
            tone="critical"
            onChange={(value) => onChange("minimumValue", value)}
          />
          <RangeField
            label="Target value"
            required
            value={values.targetValue}
            error={errors.targetValue}
            hint="This is the amber-to-green boundary."
            min={sliderBounds.min}
            max={sliderBounds.max}
            step={sliderBounds.step}
            tone={previewAssessment.tone === "critical" ? "warning" : previewAssessment.tone}
            onChange={(value) => onChange("targetValue", value)}
          />
        </div>

        <div className="mt-6">
          <ThresholdBar
            direction={values.thresholdDirection}
            minimumValue={values.minimumValue}
            targetValue={values.targetValue}
            currentValue={previewValue}
            currentLabel="Preview"
            unit={values.unit}
          />
        </div>
      </SectionCard>
    </div>
  );
};
