import Link from "next/link";

import { getDirectionLabel, getMetricHealth } from "@/lib/metricHealth";
import { Metric } from "@/types/metric";

import { StatusBadge } from "./StatusBadge";
import { ThresholdBar } from "./ThresholdBar";

interface MetricCardProps {
  metric: Metric;
}

const cardToneStyles = {
  good: "border-emerald-500/20 bg-gradient-to-br from-emerald-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(16,185,129,0.12)]",
  warning:
    "border-amber-500/20 bg-gradient-to-br from-amber-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(245,158,11,0.12)]",
  critical:
    "border-rose-500/20 bg-gradient-to-br from-rose-500/12 via-surface to-surface shadow-[0_24px_48px_rgba(244,63,94,0.12)]",
  neutral:
    "border-sky-500/15 bg-gradient-to-br from-sky-500/10 via-surface to-surface shadow-[0_24px_48px_rgba(14,165,233,0.1)]"
} as const;

export const MetricCard = ({ metric }: MetricCardProps) => {
  const health = getMetricHealth(metric);

  return (
    <Link
      href={`/metrics/${metric.id}`}
      aria-label={`View metric ${metric.basicDetails.name}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_60px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/15 ${cardToneStyles[health.tone]}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-white/30 via-white/5 to-transparent dark:from-white/10" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="inline-flex rounded-full border border-border/20 bg-surfaceAlt/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
          {getDirectionLabel(metric.measurementConfig.thresholdDirection)}
        </div>
        <StatusBadge status={metric.status} />
      </div>

      <h3 className="relative mt-5 text-[1.2rem] font-semibold leading-tight tracking-tight text-ink">
        {metric.basicDetails.name}
      </h3>

      <div className="relative mt-3 flex items-center justify-between gap-4 text-sm text-ink/65">
        <p className="font-medium text-ink/72">{metric.basicDetails.category}</p>
        <p className="truncate text-right">{metric.alertsOwnership.owner}</p>
      </div>

      <div className="relative mt-5">
        <ThresholdBar
          compact
          showDirectionLabel={false}
          direction={metric.measurementConfig.thresholdDirection}
          minimumValue={metric.measurementConfig.minimumValue}
          targetValue={metric.measurementConfig.targetValue}
          currentValue={health.currentValue}
          unit={metric.measurementConfig.unit}
          className="bg-white/55 dark:bg-slate-950/20"
        />
      </div>
    </Link>
  );
};
