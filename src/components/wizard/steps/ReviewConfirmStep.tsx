import { MetricFormValues, WizardStepId } from "@/types/metric";

import { SectionCard } from "@/components/ui/SectionCard";

interface ReviewConfirmStepProps {
  values: MetricFormValues;
  onEditStep: (stepId: WizardStepId) => void;
}

export const ReviewConfirmStep = ({ values, onEditStep }: ReviewConfirmStepProps) => (
  <SectionCard
    title="Step 4: Review and Confirm"
    description="Review the full metric payload before saving as draft or activating it in the metrics library."
  >
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl bg-canvas/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">
            Basic details
          </h3>
          <button
            type="button"
            onClick={() => onEditStep("basic-details")}
            className="text-sm font-semibold text-accent"
          >
            Edit
          </button>
        </div>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-ink/50">Metric name</dt>
            <dd className="font-medium">{values.basicDetails.name}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Category</dt>
            <dd className="font-medium">{values.basicDetails.category}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Description</dt>
            <dd className="font-medium">
              {values.basicDetails.description || "No description provided"}
            </dd>
          </div>
          <div>
            <dt className="text-ink/50">Applicable AI system types</dt>
            <dd className="font-medium">{values.basicDetails.applicableSystemTypes.join(", ")}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-3xl bg-canvas/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">
            Measurement configuration
          </h3>
          <button
            type="button"
            onClick={() => onEditStep("measurement-config")}
            className="text-sm font-semibold text-accent"
          >
            Edit
          </button>
        </div>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-ink/50">Data source type</dt>
            <dd className="font-medium">{values.measurementConfig.dataSourceType}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Measurement frequency</dt>
            <dd className="font-medium">{values.measurementConfig.measurementFrequency}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Thresholds</dt>
            <dd className="font-medium">
              {values.measurementConfig.thresholdDirection === "higher" ? "Higher is better" : "Lower is better"}
              {" | "}
              {values.measurementConfig.minimumValue ?? "N/A"} minimum
              {" | "}
              {values.measurementConfig.targetValue ?? "N/A"} target
              {values.measurementConfig.unit ? ` ${values.measurementConfig.unit}` : ""}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-3xl bg-canvas/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">
            Alerts and ownership
          </h3>
          <button
            type="button"
            onClick={() => onEditStep("alerts-ownership")}
            className="text-sm font-semibold text-accent"
          >
            Edit
          </button>
        </div>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-ink/50">Metric owner</dt>
            <dd className="font-medium">{values.alertsOwnership.owner}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Alert recipients</dt>
            <dd className="font-medium">{values.alertsOwnership.alertRecipients.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Alert conditions</dt>
            <dd className="font-medium">{values.alertsOwnership.alertConditions.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-ink/50">Escalation policy</dt>
            <dd className="font-medium">{values.alertsOwnership.escalationPolicy}</dd>
          </div>
        </dl>
      </div>
    </div>
  </SectionCard>
);
