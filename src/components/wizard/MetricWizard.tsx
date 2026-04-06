"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useMetrics } from "@/context/MetricsContext";
import { useMetricWizard } from "@/hooks/useMetricWizard";
import { MetricFormValues, MetricStatus, WizardStepId } from "@/types/metric";

import { SectionCard } from "@/components/ui/SectionCard";

import { WizardFooter } from "./WizardFooter";
import { WizardHeader } from "./WizardHeader";
import { AlertsOwnershipStep } from "./steps/AlertsOwnershipStep";
import { BasicDetailsStep } from "./steps/BasicDetailsStep";
import { MeasurementConfigStep } from "./steps/MeasurementConfigStep";
import { ReviewConfirmStep } from "./steps/ReviewConfirmStep";

interface MetricWizardProps {
  mode: "create" | "edit";
  initialValues?: MetricFormValues;
  metricId?: string;
}

const METRIC_SUCCESS_TOAST_KEY = "rait-metrics-success-toast";

const hasErrors = (values: Record<string, string | undefined>): boolean =>
  Object.keys(values).length > 0;

export const MetricWizard = ({ mode, initialValues, metricId }: MetricWizardProps) => {
  const router = useRouter();
  const { saveMetric } = useMetrics();
  const {
    state,
    currentStep,
    steps,
    updateBasicField,
    updateMeasurementField,
    updateAlertsField,
    goBack,
    goNext,
    goToStep,
    canNavigateToStep,
    submit
  } = useMetricWizard(initialValues);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  const submissionHasErrors =
    hasErrors(state.errors.basicDetails) ||
    hasErrors(state.errors.measurementConfig) ||
    hasErrors(state.errors.alertsOwnership);

  const handleReviewEdit = (stepId: WizardStepId) => {
    const nextIndex = steps.findIndex((step) => step.id === stepId);
    goToStep(nextIndex);
  };

  const handleSave = (status: MetricStatus) => {
    const payload = submit();

    if (!payload) {
      setSubmissionMessage("Validation failed. Review the highlighted fields before continuing.");
      return;
    }

    saveMetric(payload, status, metricId);

    if (mode === "create" && typeof window !== "undefined") {
      window.sessionStorage.setItem(
        METRIC_SUCCESS_TOAST_KEY,
        status === "active"
          ? "Metric added and activated successfully."
          : "Metric added successfully."
      );
    }

    if (mode === "edit" && typeof window !== "undefined") {
      window.sessionStorage.setItem(
        METRIC_SUCCESS_TOAST_KEY,
        status === "active"
          ? "Metric updated successfully."
          : "Metric saved as draft successfully."
      );
    }

    router.push("/metrics");
  };

  return (
    <div className="space-y-6">
      <WizardHeader
        steps={steps}
        currentStepIndex={state.currentStepIndex}
        canSelectStep={canNavigateToStep}
        onStepSelect={goToStep}
      />

      {currentStep.id === "basic-details" ? (
        <BasicDetailsStep
          values={state.values.basicDetails}
          errors={state.errors.basicDetails}
          onChange={updateBasicField}
        />
      ) : null}

      {currentStep.id === "measurement-config" ? (
        <MeasurementConfigStep
          values={state.values.measurementConfig}
          errors={state.errors.measurementConfig}
          onChange={updateMeasurementField}
        />
      ) : null}

      {currentStep.id === "alerts-ownership" ? (
        <AlertsOwnershipStep
          values={state.values.alertsOwnership}
          errors={state.errors.alertsOwnership}
          onChange={updateAlertsField}
        />
      ) : null}

      {currentStep.id === "review-confirm" ? (
        <ReviewConfirmStep values={state.values} onEditStep={handleReviewEdit} />
      ) : null}

      <SectionCard>
        {submissionMessage ? (
          <div
            role={state.submitted && submissionHasErrors ? "alert" : "status"}
            className={`mb-6 rounded-3xl border px-4 py-3 text-sm ${
              state.submitted && submissionHasErrors
                ? "border-danger/20 bg-rose-50 text-danger"
                : "border-accent/20 bg-accentSoft text-accent"
            }`}
          >
            {submissionMessage}
          </div>
        ) : null}

        <WizardFooter
          canGoBack={state.currentStepIndex > 0}
          isLastStep={state.currentStepIndex === steps.length - 1}
          onBack={goBack}
          onNext={goNext}
          onSaveDraft={() => handleSave("draft")}
          onActivate={() => handleSave("active")}
        />
      </SectionCard>
    </div>
  );
};
