import {
  aiSystemTypes,
  alertConditions,
  AlertsOwnershipConfig,
  BasicMetricDetails,
  dataSourceTypes,
  escalationPolicies,
  MeasurementConfig,
  measurementFrequencies,
  metricCategories,
  MetricFormErrors,
  MetricFormValues,
  thresholdDirections,
  WizardStepId
} from "@/types/metric";

const emptyErrors = (): MetricFormErrors => ({
  basicDetails: {},
  measurementConfig: {},
  alertsOwnership: {}
});

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isOneOf = <TValue extends string>(
  value: string,
  options: readonly TValue[]
): value is TValue => options.includes(value as TValue);

export const validateBasicDetails = (
  values: BasicMetricDetails
): MetricFormErrors["basicDetails"] => {
  const errors: MetricFormErrors["basicDetails"] = {};

  if (!values.name.trim()) {
    errors.name = "Metric name is required.";
  }

  if (!isOneOf(values.category, metricCategories)) {
    errors.category = "Select a valid metric category.";
  }

  if (values.description.trim() !== "" && values.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters.";
  }

  if (values.applicableSystemTypes.length === 0) {
    errors.applicableSystemTypes = "Select at least one AI system type.";
  } else if (!values.applicableSystemTypes.every((systemType) => isOneOf(systemType, aiSystemTypes))) {
    errors.applicableSystemTypes = "Select valid AI system types.";
  }

  return errors;
};

export const validateMeasurementConfig = (
  values: MeasurementConfig
): MetricFormErrors["measurementConfig"] => {
  const errors: MetricFormErrors["measurementConfig"] = {};

  if (!isOneOf(values.dataSourceType, dataSourceTypes)) {
    errors.dataSourceType = "Select a valid data source type.";
  }

  if (!isOneOf(values.measurementFrequency, measurementFrequencies)) {
    errors.measurementFrequency = "Select a valid measurement frequency.";
  }

  if (!isOneOf(values.thresholdDirection, thresholdDirections)) {
    errors.thresholdDirection = "Select a valid threshold direction.";
  }

  if (values.minimumValue === null) {
    errors.minimumValue = "Minimum acceptable value is required.";
  }

  if (values.targetValue === null) {
    errors.targetValue = "Target value is required.";
  }

  if (!values.unit.trim()) {
    errors.unit = "Unit of measurement is required.";
  }

  if (
    values.minimumValue !== null &&
    values.targetValue !== null &&
    values.thresholdDirection === "higher" &&
    values.targetValue < values.minimumValue
  ) {
    errors.targetValue = "For higher-is-better metrics, target must be greater than or equal to minimum.";
  }

  if (
    values.minimumValue !== null &&
    values.targetValue !== null &&
    values.thresholdDirection === "lower" &&
    values.targetValue > values.minimumValue
  ) {
    errors.targetValue = "For lower-is-better metrics, target must be less than or equal to minimum.";
  }

  return errors;
};

export const validateAlertsOwnership = (
  values: AlertsOwnershipConfig
): MetricFormErrors["alertsOwnership"] => {
  const errors: MetricFormErrors["alertsOwnership"] = {};

  if (!values.owner.trim()) {
    errors.owner = "Metric owner is required.";
  }

  if (!isOneOf(values.escalationPolicy, escalationPolicies)) {
    errors.escalationPolicy = "Select a valid escalation policy.";
  }

  if (values.alertRecipients.length === 0) {
    errors.alertRecipients = "Add at least one alert recipient.";
  } else if (!values.alertRecipients.every(isValidEmail)) {
    errors.alertRecipients = "All alert recipients must be valid email addresses.";
  }

  if (values.alertConditions.length === 0) {
    errors.alertConditions = "Select at least one alert condition.";
  } else if (!values.alertConditions.every((condition) => isOneOf(condition, alertConditions))) {
    errors.alertConditions = "Select valid alert conditions.";
  }

  return errors;
};

export const validateMetricForm = (values: MetricFormValues): MetricFormErrors => ({
  basicDetails: validateBasicDetails(values.basicDetails),
  measurementConfig: validateMeasurementConfig(values.measurementConfig),
  alertsOwnership: validateAlertsOwnership(values.alertsOwnership)
});

export const validateStep = (
  stepId: WizardStepId,
  values: MetricFormValues
): MetricFormErrors => {
  const errors = emptyErrors();

  if (stepId === "basic-details") {
    errors.basicDetails = validateBasicDetails(values.basicDetails);
  }

  if (stepId === "measurement-config") {
    errors.measurementConfig = validateMeasurementConfig(values.measurementConfig);
  }

  if (stepId === "alerts-ownership") {
    errors.alertsOwnership = validateAlertsOwnership(values.alertsOwnership);
  }

  return errors;
};

export const hasValidationErrors = (errors: MetricFormErrors): boolean =>
  Object.keys(errors.basicDetails).length > 0 ||
  Object.keys(errors.measurementConfig).length > 0 ||
  Object.keys(errors.alertsOwnership).length > 0;

export const validateEmailAddress = (value: string): string | null => {
  if (!value.trim()) {
    return "Email address is required.";
  }

  if (!isValidEmail(value.trim())) {
    return "Enter a valid email address.";
  }

  return null;
};
