import { Metric, ThresholdDirection } from "@/types/metric";

export type MetricSignalTone = "good" | "warning" | "critical" | "neutral";

interface ThresholdAssessmentArgs {
  direction: ThresholdDirection;
  minimumValue: number | null;
  targetValue: number | null;
  currentValue: number | null;
}

interface ThresholdDomainArgs {
  minimumValue: number | null;
  targetValue: number | null;
  currentValue: number | null;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toDisplayNumber = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: value < 1 ? 2 : 0,
    maximumFractionDigits: value < 1 ? 3 : 2
  }).format(value);

export const formatMetricValue = (value: number | null | undefined, unit: string): string => {
  if (value === null || value === undefined) {
    return "No live data";
  }

  return `${toDisplayNumber(value)}${unit.trim() ? ` ${unit.trim()}` : ""}`;
};

export const getMetricPreviewValue = (
  minimumValue: number | null,
  targetValue: number | null
): number | null => {
  if (minimumValue === null || targetValue === null) {
    return null;
  }

  const midpoint = (minimumValue + targetValue) / 2;

  return midpoint;
};

export const getThresholdAssessment = ({
  direction,
  minimumValue,
  targetValue,
  currentValue
}: ThresholdAssessmentArgs): {
  tone: MetricSignalTone;
  label: string;
  message: string;
} => {
  if (
    currentValue === null ||
    minimumValue === null ||
    targetValue === null ||
    Number.isNaN(currentValue)
  ) {
    return {
      tone: "neutral",
      label: "No reading",
      message: "Awaiting the first live measurement."
    };
  }

  if (direction === "higher") {
    if (currentValue < minimumValue) {
      return {
        tone: "critical",
        label: "Critical",
        message: "Below guardrail"
      };
    }

    if (currentValue < targetValue) {
      return {
        tone: "warning",
        label: "Warning",
        message: "Below target"
      };
    }

    return {
      tone: "good",
      label: "Safe",
      message: "Meeting target"
    };
  }

  if (currentValue > minimumValue) {
    return {
      tone: "critical",
      label: "Critical",
      message: "Above guardrail"
    };
  }

  if (currentValue > targetValue) {
    return {
      tone: "warning",
      label: "Warning",
      message: "Above target"
    };
  }

  return {
    tone: "good",
    label: "Safe",
    message: "Within target"
  };
};

export const getThresholdDomain = ({
  minimumValue,
  targetValue,
  currentValue
}: ThresholdDomainArgs): { start: number; end: number } => {
  const values = [minimumValue, targetValue, currentValue].filter(
    (value): value is number => value !== null && value !== undefined && !Number.isNaN(value)
  );

  const highestValue = values.length > 0 ? Math.max(...values) : 1;
  const end = highestValue <= 1 ? 1 : Math.ceil(highestValue * 1.2 * 10) / 10;

  return {
    start: 0,
    end: Math.max(end, 1)
  };
};

export const getThresholdMarkerPosition = (
  value: number | null,
  domain: { start: number; end: number }
): number | null => {
  if (value === null || Number.isNaN(value)) {
    return null;
  }

  const range = domain.end - domain.start;

  if (range <= 0) {
    return 0;
  }

  return clamp(((value - domain.start) / range) * 100, 0, 100);
};

export const getMetricHealth = (metric: Metric) => {
  const currentValue = metric.latestReading ?? null;
  const assessment = getThresholdAssessment({
    direction: metric.measurementConfig.thresholdDirection,
    minimumValue: metric.measurementConfig.minimumValue,
    targetValue: metric.measurementConfig.targetValue,
    currentValue
  });

  return {
    ...assessment,
    currentValue
  };
};

export const getDirectionLabel = (direction: ThresholdDirection) =>
  direction === "higher" ? "Higher is better" : "Lower is better";
