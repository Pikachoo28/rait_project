import {
  formatMetricValue,
  getDirectionLabel,
  getThresholdAssessment,
  getThresholdDomain,
  getThresholdMarkerPosition
} from "@/lib/metricHealth";
import { ThresholdDirection } from "@/types/metric";

interface ThresholdBarProps {
  direction: ThresholdDirection;
  minimumValue: number | null;
  targetValue: number | null;
  currentValue?: number | null;
  unit?: string;
  currentLabel?: string;
  targetLabel?: string;
  compact?: boolean;
  showDirectionLabel?: boolean;
  className?: string;
}

const zoneStyles = {
  bad: "bg-rose-500/90",
  warn: "bg-amber-400/95",
  good: "bg-emerald-500/90"
};

const markerStyles = {
  current: "border-slate-950 bg-white dark:border-white dark:bg-slate-950",
  target: "border-sky-500 bg-sky-400"
};

export const ThresholdBar = ({
  direction,
  minimumValue,
  targetValue,
  currentValue = null,
  unit = "",
  currentLabel = "Current",
  targetLabel = "Target",
  compact = false,
  showDirectionLabel = true,
  className = ""
}: ThresholdBarProps) => {
  if (minimumValue === null || targetValue === null) {
    return (
      <div
        className={`rounded-[1.75rem] border border-dashed border-border/35 bg-surfaceAlt/70 p-4 text-sm text-ink/55 ${className}`}
      >
        Set the threshold and target to render the health bar.
      </div>
    );
  }

  const assessment = getThresholdAssessment({
    direction,
    minimumValue,
    targetValue,
    currentValue
  });
  const domain = getThresholdDomain({
    minimumValue,
    targetValue,
    currentValue
  });
  const minimumPosition = getThresholdMarkerPosition(minimumValue, domain) ?? 0;
  const targetPosition = getThresholdMarkerPosition(targetValue, domain) ?? 100;
  const currentPosition = getThresholdMarkerPosition(currentValue, domain);
  const breakpoints =
    direction === "higher"
      ? [minimumPosition, targetPosition]
      : [targetPosition, minimumPosition];
  const widths = [
    Math.max(breakpoints[0], 0),
    Math.max(breakpoints[1] - breakpoints[0], 0),
    Math.max(100 - breakpoints[1], 0)
  ];
  const zones =
    direction === "higher"
      ? [zoneStyles.bad, zoneStyles.warn, zoneStyles.good]
      : [zoneStyles.good, zoneStyles.warn, zoneStyles.bad];

  return (
    <div
      className={`rounded-[1.75rem] border border-border/35 bg-surfaceAlt/70 ${compact ? "p-4" : "p-5"} ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
            Threshold band
          </p>
          {showDirectionLabel ? (
            <p className="mt-1 text-sm font-medium text-ink/70">{getDirectionLabel(direction)}</p>
          ) : null}
        </div>
        {!compact ? (
          <p className="text-sm font-medium text-ink/65">
            {assessment.message}
          </p>
        ) : null}
      </div>

      <div className="relative mt-4">
        <div className="flex h-3 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/80">
          {widths.map((width, index) => (
            <div
              key={`${zones[index]}-${index}`}
              className={zones[index]}
              style={{ width: `${width}%` }}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 -top-6 h-11"
          aria-hidden="true"
        >
          {currentPosition !== null ? (
            <div
              className="absolute top-0 -translate-x-1/2 text-center transition-all duration-300"
              style={{ left: `${currentPosition}%` }}
            >
              <div className="rounded-full bg-slate-950 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg dark:bg-white dark:text-slate-950">
                {currentLabel}
              </div>
              <div
                className={`mx-auto mt-1 h-4 w-4 rounded-full border-[3px] shadow-sm ${markerStyles.current}`}
              />
            </div>
          ) : null}

          <div
            className="absolute top-0 -translate-x-1/2 text-center transition-all duration-300"
            style={{ left: `${targetPosition}%` }}
          >
            <div className="rounded-full bg-sky-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
              {targetLabel}
            </div>
            <div
              className={`mx-auto mt-1 h-4 w-4 rounded-full border-[3px] shadow-sm ${markerStyles.target}`}
            />
          </div>
        </div>
      </div>

      <div className={`${compact ? "mt-7 grid-cols-2" : "mt-8 grid-cols-3"} grid gap-3`}>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
            Guardrail
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            {formatMetricValue(minimumValue, unit)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
            Target
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            {formatMetricValue(targetValue, unit)}
          </p>
        </div>
        {!compact ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              Live
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {formatMetricValue(currentValue, unit)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
