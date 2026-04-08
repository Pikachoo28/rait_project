import { ThresholdDirection } from "@/types/metric";

import { ThresholdBar } from "@/components/metrics/ThresholdBar";

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
}: ThresholdIndicatorProps) => (
  <ThresholdBar
    direction={direction}
    minimumValue={minimumValue}
    targetValue={targetValue}
    unit={unit}
    currentLabel="Preview"
  />
);
