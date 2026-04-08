export const metricCategories = [
  "Fairness",
  "Transparency",
  "Safety",
  "Privacy",
  "Accountability",
  "Robustness"
] as const;

export const metricStatuses = ["draft", "active", "archived"] as const;

export const aiSystemTypes = [
  "Classification",
  "NLP",
  "Computer Vision",
  "Generative AI",
  "Recommendation"
] as const;

export const dataSourceTypes = [
  "API endpoint",
  "Manual upload",
  "Database query",
  "SDK integration"
] as const;

export const measurementFrequencies = [
  "Real-time",
  "Daily",
  "Weekly",
  "Monthly",
  "On-demand"
] as const;

export const alertConditions = [
  "Below minimum threshold",
  "Approaching minimum threshold",
  "Data unavailable",
  "Configuration change"
] as const;

export const escalationPolicies = [
  "None",
  "Notify manager",
  "Notify compliance team",
  "Block deployment"
] as const;

export const thresholdDirections = ["higher", "lower"] as const;

export type MetricCategory = (typeof metricCategories)[number];
export type MetricStatus = (typeof metricStatuses)[number];
export type AISystemType = (typeof aiSystemTypes)[number];
export type DataSourceType = (typeof dataSourceTypes)[number];
export type MeasurementFrequency = (typeof measurementFrequencies)[number];
export type AlertCondition = (typeof alertConditions)[number];
export type EscalationPolicy = (typeof escalationPolicies)[number];
export type ThresholdDirection = (typeof thresholdDirections)[number];

export interface BasicMetricDetails {
  name: string;
  category: MetricCategory;
  description: string;
  applicableSystemTypes: AISystemType[];
}

export interface MeasurementConfig {
  dataSourceType: DataSourceType;
  measurementFrequency: MeasurementFrequency;
  thresholdDirection: ThresholdDirection;
  minimumValue: number | null;
  targetValue: number | null;
  unit: string;
}

export interface AlertsOwnershipConfig {
  owner: string;
  alertRecipients: string[];
  alertConditions: AlertCondition[];
  escalationPolicy: EscalationPolicy;
}

export interface MetricFormValues {
  basicDetails: BasicMetricDetails;
  measurementConfig: MeasurementConfig;
  alertsOwnership: AlertsOwnershipConfig;
}

export interface Metric {
  id: string;
  status: MetricStatus;
  createdAt: string;
  updatedAt: string;
  latestReading?: number | null;
  basicDetails: BasicMetricDetails;
  measurementConfig: MeasurementConfig;
  alertsOwnership: AlertsOwnershipConfig;
}

export interface MetricFormErrors {
  basicDetails: Partial<Record<keyof BasicMetricDetails, string>>;
  measurementConfig: Partial<Record<keyof MeasurementConfig, string>>;
  alertsOwnership: Partial<Record<keyof AlertsOwnershipConfig, string>>;
}

export type WizardStepId =
  | "basic-details"
  | "measurement-config"
  | "alerts-ownership"
  | "review-confirm";

export interface WizardStepDefinition {
  id: WizardStepId;
  title: string;
  description: string;
}

export interface MetricFilterState {
  search: string;
  category: MetricCategory | "all";
  status: MetricStatus | "all";
}
