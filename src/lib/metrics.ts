import { Metric, MetricFormValues, MetricStatus, ThresholdDirection } from "@/types/metric";

export const mapMetricToFormValues = (metric: Metric): MetricFormValues => ({
  basicDetails: {
    ...metric.basicDetails,
    applicableSystemTypes: [...metric.basicDetails.applicableSystemTypes]
  },
  measurementConfig: { ...metric.measurementConfig },
  alertsOwnership: {
    ...metric.alertsOwnership,
    alertRecipients: [...metric.alertsOwnership.alertRecipients],
    alertConditions: [...metric.alertsOwnership.alertConditions]
  }
});

export const buildMetricFromFormValues = (
  values: MetricFormValues,
  status: MetricStatus,
  existingMetric?: Metric
): Metric => {
  const timestamp = new Date().toISOString();

  return {
    id: existingMetric?.id ?? createMetricId(values.basicDetails.name),
    status,
    createdAt: existingMetric?.createdAt ?? timestamp,
    updatedAt: timestamp,
    basicDetails: {
      ...values.basicDetails,
      applicableSystemTypes: [...values.basicDetails.applicableSystemTypes]
    },
    measurementConfig: { ...values.measurementConfig },
    alertsOwnership: {
      ...values.alertsOwnership,
      alertRecipients: [...values.alertsOwnership.alertRecipients],
      alertConditions: [...values.alertsOwnership.alertConditions]
    }
  };
};

export const formatThresholdRange = (
  direction: ThresholdDirection,
  minimumValue: number | null,
  targetValue: number | null,
  unit: string
): string => {
  if (minimumValue === null && targetValue === null) {
    return "Not configured";
  }

  const symbol = direction === "higher" ? ">=" : "<=";
  const minimumText = minimumValue === null ? "N/A" : `${symbol} ${minimumValue}`;
  const targetText = targetValue === null ? "N/A" : `Target ${targetValue}`;
  const unitText = unit.trim() ? ` ${unit.trim()}` : "";

  return `${minimumText}${unitText} | ${targetText}${unitText}`;
};

export const getThresholdProgress = (
  direction: ThresholdDirection,
  minimumValue: number | null,
  targetValue: number | null
): number => {
  if (minimumValue === null || targetValue === null) {
    return 50;
  }

  if (direction === "higher") {
    if (targetValue <= 0) {
      return 0;
    }

    return Math.max(10, Math.min(100, (minimumValue / targetValue) * 100));
  }

  if (minimumValue <= 0) {
    return 100;
  }

  return Math.max(10, Math.min(100, (targetValue / minimumValue) * 100));
};

export const slugifyMetricName = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createMetricId = (name: string): string => {
  const slug = slugifyMetricName(name) || "metric";
  const randomSuffix = globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);

  return `${slug}-${randomSuffix}`;
};
