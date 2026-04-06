import { createEmptyMetricFormValues } from "@/data/mockMetrics";
import {
  AlertsOwnershipConfig,
  BasicMetricDetails,
  MeasurementConfig,
  MetricFormErrors,
  MetricFormValues,
  WizardStepDefinition,
  WizardStepId
} from "@/types/metric";

export const metricWizardSteps: WizardStepDefinition[] = [
  {
    id: "basic-details",
    title: "Basic details",
    description: "Define the metric purpose, category, and supported AI system types."
  },
  {
    id: "measurement-config",
    title: "Measurement config",
    description: "Configure the data source, collection cadence, and thresholds."
  },
  {
    id: "alerts-ownership",
    title: "Alerts & ownership",
    description: "Assign ownership, recipients, alert conditions, and escalation policy."
  },
  {
    id: "review-confirm",
    title: "Review & confirm",
    description: "Review the full payload before submission."
  }
];

const emptyErrors = (): MetricFormErrors => ({
  basicDetails: {},
  measurementConfig: {},
  alertsOwnership: {}
});

export interface MetricWizardState {
  currentStepIndex: number;
  values: MetricFormValues;
  errors: MetricFormErrors;
  touchedSteps: Partial<Record<WizardStepId, boolean>>;
  submitted: boolean;
}

type BasicField = keyof BasicMetricDetails;
type MeasurementField = keyof MeasurementConfig;
type AlertsField = keyof AlertsOwnershipConfig;

export type MetricWizardAction =
  | { type: "SET_BASIC_FIELD"; field: BasicField; value: BasicMetricDetails[BasicField] }
  | {
      type: "SET_MEASUREMENT_FIELD";
      field: MeasurementField;
      value: MeasurementConfig[MeasurementField];
    }
  | {
      type: "SET_ALERTS_FIELD";
      field: AlertsField;
      value: AlertsOwnershipConfig[AlertsField];
    }
  | { type: "SET_ERRORS"; errors: MetricFormErrors }
  | { type: "GO_TO_STEP"; index: number }
  | { type: "MARK_STEP_TOUCHED"; stepId: WizardStepId }
  | { type: "MARK_SUBMITTED" }
  | { type: "RESET"; values?: MetricFormValues };

export const createMetricWizardState = (
  initialValues?: MetricFormValues
): MetricWizardState => ({
  currentStepIndex: 0,
  values: initialValues ?? createEmptyMetricFormValues(),
  errors: emptyErrors(),
  touchedSteps: {},
  submitted: false
});

export const metricWizardReducer = (
  state: MetricWizardState,
  action: MetricWizardAction
): MetricWizardState => {
  switch (action.type) {
    case "SET_BASIC_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          basicDetails: {
            ...state.values.basicDetails,
            [action.field]: action.value
          }
        }
      };
    case "SET_MEASUREMENT_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          measurementConfig: {
            ...state.values.measurementConfig,
            [action.field]: action.value
          }
        }
      };
    case "SET_ALERTS_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          alertsOwnership: {
            ...state.values.alertsOwnership,
            [action.field]: action.value
          }
        }
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStepIndex: action.index
      };
    case "MARK_STEP_TOUCHED":
      return {
        ...state,
        touchedSteps: {
          ...state.touchedSteps,
          [action.stepId]: true
        }
      };
    case "MARK_SUBMITTED":
      return {
        ...state,
        submitted: true
      };
    case "RESET":
      return createMetricWizardState(action.values);
    default:
      return state;
  }
};
