"use client";

import { useReducer } from "react";

import {
  hasValidationErrors,
  validateMetricForm,
  validateStep
} from "@/lib/validation/metricForm";
import {
  createMetricWizardState,
  metricWizardReducer,
  metricWizardSteps
} from "@/state/metricWizardReducer";
import {
  AlertsOwnershipConfig,
  BasicMetricDetails,
  MeasurementConfig,
  MetricFormValues
} from "@/types/metric";

export const useMetricWizard = (initialValues?: MetricFormValues) => {
  const [state, dispatch] = useReducer(
    metricWizardReducer,
    initialValues,
    createMetricWizardState
  );

  const currentStep = metricWizardSteps[state.currentStepIndex];
  const getStepErrorsForIndex = (index: number) => {
    const step = metricWizardSteps[index];

    return step ? validateStep(step.id, state.values) : null;
  };
  const canNavigateToStep = (index: number) => {
    if (index <= state.currentStepIndex) {
      return true;
    }

    return metricWizardSteps
      .slice(0, index)
      .every((step) => !hasValidationErrors(validateStep(step.id, state.values)));
  };

  const updateBasicField = <TField extends keyof BasicMetricDetails>(
    field: TField,
    value: BasicMetricDetails[TField]
  ) => {
    dispatch({ type: "SET_BASIC_FIELD", field, value });
  };

  const updateMeasurementField = <TField extends keyof MeasurementConfig>(
    field: TField,
    value: MeasurementConfig[TField]
  ) => {
    dispatch({ type: "SET_MEASUREMENT_FIELD", field, value });
  };

  const updateAlertsField = <TField extends keyof AlertsOwnershipConfig>(
    field: TField,
    value: AlertsOwnershipConfig[TField]
  ) => {
    dispatch({ type: "SET_ALERTS_FIELD", field, value });
  };

  const goBack = () => {
    if (state.currentStepIndex === 0) {
      return;
    }

    dispatch({ type: "GO_TO_STEP", index: state.currentStepIndex - 1 });
  };

  const goNext = () => {
    if (currentStep.id === "review-confirm") {
      return;
    }

    const stepErrors = validateStep(currentStep.id, state.values);
    dispatch({ type: "MARK_STEP_TOUCHED", stepId: currentStep.id });
    dispatch({ type: "SET_ERRORS", errors: { ...state.errors, ...stepErrors } });

    if (hasValidationErrors(stepErrors)) {
      return;
    }

    dispatch({ type: "GO_TO_STEP", index: state.currentStepIndex + 1 });
  };

  const goToStep = (index: number) => {
    if (index < 0 || index >= metricWizardSteps.length) {
      return;
    }

    if (canNavigateToStep(index)) {
      dispatch({ type: "GO_TO_STEP", index });
      return;
    }

    const blockedStepIndex = metricWizardSteps.findIndex(
      (step, stepIndex) =>
        stepIndex < index && hasValidationErrors(validateStep(step.id, state.values))
    );

    if (blockedStepIndex === -1) {
      return;
    }

    const blockedStep = metricWizardSteps[blockedStepIndex];
    const blockedStepErrors = getStepErrorsForIndex(blockedStepIndex);

    if (!blockedStep || !blockedStepErrors) {
      return;
    }

    dispatch({ type: "MARK_STEP_TOUCHED", stepId: blockedStep.id });
    dispatch({
      type: "SET_ERRORS",
      errors: {
        ...state.errors,
        ...blockedStepErrors
      }
    });
    dispatch({ type: "GO_TO_STEP", index: blockedStepIndex });
  };

  const submit = (): MetricFormValues | null => {
    const nextErrors = validateMetricForm(state.values);
    dispatch({ type: "SET_ERRORS", errors: nextErrors });
    dispatch({ type: "MARK_SUBMITTED" });

    if (hasValidationErrors(nextErrors)) {
      return null;
    }

    return state.values;
  };

  return {
    state,
    currentStep,
    steps: metricWizardSteps,
    updateBasicField,
    updateMeasurementField,
    updateAlertsField,
    goBack,
    goNext,
    goToStep,
    canNavigateToStep,
    submit
  };
};
