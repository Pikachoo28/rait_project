import { MetricFormValues, MetricStatus, WizardStepId } from "@/types/metric";

import { getMetricPreviewValue, getThresholdAssessment } from "@/lib/metricHealth";
import { ThresholdBar } from "@/components/metrics/ThresholdBar";
import { StatusBadge } from "@/components/metrics/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";

interface ReviewConfirmStepProps {
  values: MetricFormValues;
  previewStatus: MetricStatus;
  onEditStep: (stepId: WizardStepId) => void;
}

const previewToneStyles = {
  good:
    "border-emerald-500/20 bg-gradient-to-br from-emerald-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(16,185,129,0.12)]",
  warning:
    "border-amber-500/20 bg-gradient-to-br from-amber-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(245,158,11,0.12)]",
  critical:
    "border-rose-500/20 bg-gradient-to-br from-rose-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(244,63,94,0.12)]",
  neutral:
    "border-sky-500/15 bg-gradient-to-br from-sky-500/10 via-surface to-surface shadow-[0_24px_48px_rgba(14,165,233,0.1)]"
} as const;

export const ReviewConfirmStep = ({
  values,
  previewStatus,
  onEditStep
}: ReviewConfirmStepProps) => {
  const previewValue = getMetricPreviewValue(
    values.measurementConfig.minimumValue,
    values.measurementConfig.targetValue
  );
  const previewAssessment = getThresholdAssessment({
    direction: values.measurementConfig.thresholdDirection,
    minimumValue: values.measurementConfig.minimumValue,
    targetValue: values.measurementConfig.targetValue,
    currentValue: previewValue
  });

  return (
    <div className="space-y-6">
      <SectionCard
        title="Dashboard preview"
        description="Review the metric as a decision-ready health surface before saving."
      >
        <div
          className={`relative overflow-hidden rounded-[2rem] border p-6 ${previewToneStyles[previewAssessment.tone]}`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-white/30 via-white/5 to-transparent dark:from-white/10" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="inline-flex rounded-full border border-border/20 bg-surfaceAlt/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
              {values.measurementConfig.thresholdDirection === "higher"
                ? "Higher is better"
                : "Lower is better"}
            </div>
            <StatusBadge status={previewStatus} />
          </div>

          <p className="relative mt-5 text-3xl font-semibold tracking-tight text-ink">
            {values.basicDetails.name || "Metric name"}
          </p>
          <div className="relative mt-3 flex items-center justify-between gap-4 text-sm text-ink/65">
            <p className="font-medium text-ink/72">{values.basicDetails.category}</p>
            <p className="truncate text-right">
              {values.alertsOwnership.owner || "Owner pending"}
            </p>
          </div>

          <div className="relative mt-5">
            <ThresholdBar
              compact
              showDirectionLabel={false}
              direction={values.measurementConfig.thresholdDirection}
              minimumValue={values.measurementConfig.minimumValue}
              targetValue={values.measurementConfig.targetValue}
              currentValue={previewValue}
              currentLabel="Preview"
              unit={values.measurementConfig.unit}
              className="bg-white/55 dark:bg-slate-950/20"
            />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard title="Basic info" description="Name, category, and scope.">
          <button
            type="button"
            onClick={() => onEditStep("basic-details")}
            className="mb-5 inline-flex rounded-full border border-border/25 bg-surfaceAlt px-4 py-2 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
          >
            Edit step
          </button>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-ink/45">Metric name</dt>
              <dd className="mt-1 font-semibold text-ink">{values.basicDetails.name}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Category</dt>
              <dd className="mt-1 font-semibold text-ink">{values.basicDetails.category}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Description</dt>
              <dd className="mt-1 text-ink/70">
                {values.basicDetails.description || "No description provided"}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">System coverage</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {values.basicDetails.applicableSystemTypes.map((systemType) => (
                  <span
                    key={systemType}
                    className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300"
                  >
                    {systemType}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Measurement" description="Source, frequency, and thresholds.">
          <button
            type="button"
            onClick={() => onEditStep("measurement-config")}
            className="mb-5 inline-flex rounded-full border border-border/25 bg-surfaceAlt px-4 py-2 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
          >
            Edit step
          </button>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-ink/45">Data source</dt>
              <dd className="mt-1 font-semibold text-ink">
                {values.measurementConfig.dataSourceType}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Frequency</dt>
              <dd className="mt-1 font-semibold text-ink">
                {values.measurementConfig.measurementFrequency}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Direction</dt>
              <dd className="mt-1 font-semibold text-ink">
                {values.measurementConfig.thresholdDirection === "higher"
                  ? "Higher is better"
                  : "Lower is better"}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Unit</dt>
              <dd className="mt-1 font-semibold text-ink">{values.measurementConfig.unit}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Alerts" description="Owner, recipients, and escalation rules.">
          <button
            type="button"
            onClick={() => onEditStep("alerts-ownership")}
            className="mb-5 inline-flex rounded-full border border-border/25 bg-surfaceAlt px-4 py-2 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
          >
            Edit step
          </button>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-ink/45">Owner</dt>
              <dd className="mt-1 font-semibold text-ink">{values.alertsOwnership.owner}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Recipients</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {values.alertsOwnership.alertRecipients.map((recipient) => (
                  <span
                    key={recipient}
                    className="rounded-full border border-border/20 bg-surfaceAlt/75 px-3 py-1 text-xs font-semibold text-ink/75"
                  >
                    {recipient}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Conditions</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {values.alertsOwnership.alertConditions.map((condition) => (
                  <span
                    key={condition}
                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300"
                  >
                    {condition}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Escalation policy</dt>
              <dd className="mt-1 font-semibold text-ink">
                {values.alertsOwnership.escalationPolicy}
              </dd>
            </div>
          </dl>
        </SectionCard>
      </div>
    </div>
  );
};
