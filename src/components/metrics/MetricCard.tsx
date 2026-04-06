import Link from "next/link";

import { Metric } from "@/types/metric";

import { StatusBadge } from "./StatusBadge";

interface MetricCardProps {
  metric: Metric;
}

const formatThresholdValue = (
  direction: Metric["measurementConfig"]["thresholdDirection"],
  value: number | null,
  unit: string
): string => {
  if (value === null) {
    return "Not set";
  }

  const operator = direction === "higher" ? ">=" : "<=";
  return `${operator} ${value}${unit ? ` ${unit}` : ""}`;
};

export const MetricCard = ({ metric }: MetricCardProps) => (
  <Link
    href={`/metrics/${metric.id}`}
    aria-label={`View metric ${metric.basicDetails.name}`}
    className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/40 bg-surface/95 p-6 shadow-panel transition hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_22px_48px_rgba(18,33,26,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent opacity-80 transition group-hover:opacity-100" />

    <div className="relative flex items-start justify-between gap-4">
      <h3 className="max-w-[14rem] truncate text-[1.1rem] font-semibold leading-tight tracking-tight text-ink transition group-hover:text-accent">
        {metric.basicDetails.name}
      </h3>
      <StatusBadge status={metric.status} />
    </div>

    <div className="mt-2 inline-flex w-fit rounded-full bg-canvas px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/65">
      {metric.basicDetails.category}
    </div>

    <dl className="relative mt-5 grid gap-3 text-sm">
      <div className="rounded-3xl border border-border/30 bg-canvas/70 p-4">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
          Threshold Range
        </dt>
        <dd className="mt-2 text-lg font-semibold text-ink">
          {formatThresholdValue(
            metric.measurementConfig.thresholdDirection,
            metric.measurementConfig.minimumValue,
            metric.measurementConfig.unit
          )}
        </dd>
      </div>
      <div className="rounded-3xl border border-border/30 bg-surface p-4">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
          Owner
        </dt>
        <dd className="mt-2 text-base font-semibold text-ink">{metric.alertsOwnership.owner}</dd>
      </div>
    </dl>
  </Link>
);
