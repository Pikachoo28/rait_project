import { getThresholdProgress } from "@/lib/metrics";
import { ThresholdDirection } from "@/types/metric";

interface ThresholdIndicatorProps {
  direction: ThresholdDirection;
  minimumValue: number | null;
  targetValue: number | null;
  unit: string;
}

export const ThresholdIndicator = ({
  direction,
  minimumValue,
  targetValue,
  unit
}: ThresholdIndicatorProps) => {
  const progress = getThresholdProgress(direction, minimumValue, targetValue);
  const minimumLabel = minimumValue === null ? "Unset" : `${minimumValue}${unit ? ` ${unit}` : ""}`;
  const targetLabel = targetValue === null ? "Unset" : `${targetValue}${unit ? ` ${unit}` : ""}`;

  return (
    <div className="rounded-3xl border border-border/40 bg-canvas/70 p-4">
      <div className="flex items-center justify-between text-sm font-medium text-ink">
        <span>{direction === "higher" ? "Minimum acceptable" : "Maximum acceptable"}</span>
        <span>{minimumLabel}</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-ink/70">
        <span>Configured threshold</span>
        <span>Target {targetLabel}</span>
      </div>
    </div>
  );
};
