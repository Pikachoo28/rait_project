"use client";

import Link from "next/link";

import { getDirectionLabel, getMetricHealth } from "@/lib/metricHealth";
import { useMetrics } from "@/context/MetricsContext";
import { MetricStatus } from "@/types/metric";

import { ArrowLeftIcon } from "@/components/ui/Icons";
import { SectionCard } from "@/components/ui/SectionCard";

import { MetricStatusToggle } from "./MetricStatusToggle";
import { StatusBadge } from "./StatusBadge";
import { ThresholdBar } from "./ThresholdBar";

interface MetricDetailSummaryProps {
  metricId: string;
}

const statCardStyles = {
  good:
    "border-emerald-500/20 bg-gradient-to-br from-emerald-500/12 via-surface to-surface shadow-[0_28px_56px_rgba(16,185,129,0.1)]",
  warning:
    "border-amber-500/20 bg-gradient-to-br from-amber-500/12 via-surface to-surface shadow-[0_28px_56px_rgba(245,158,11,0.1)]",
  critical:
    "border-rose-500/20 bg-gradient-to-br from-rose-500/12 via-surface to-surface shadow-[0_28px_56px_rgba(244,63,94,0.1)]",
  neutral:
    "border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-surface to-surface shadow-[0_28px_56px_rgba(14,165,233,0.08)]"
} as const;

export const MetricDetailSummary = ({ metricId }: MetricDetailSummaryProps) => {
  const { getMetricById, updateMetricStatus } = useMetrics();
  const metric = getMetricById(metricId);

  if (!metric) {
    return (
      <SectionCard title="Metric not found">
        <p className="text-sm text-ink/70">
          The selected metric does not exist in the current in-memory session.
        </p>
        <Link
          href="/metrics"
          className="mt-4 inline-flex items-center rounded-full border border-border/25 bg-surfaceAlt px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Return to the library
        </Link>
      </SectionCard>
    );
  }

  const health = getMetricHealth(metric);

  const handleStatusChange = (status: MetricStatus) => {
    updateMetricStatus(metric.id, status);
  };

  const formatDate = (value: string): string =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(value));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div
          className={`relative overflow-hidden rounded-[2.25rem] border p-7 ${statCardStyles[health.tone]}`}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/30 via-transparent to-transparent dark:from-white/5" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="inline-flex rounded-full border border-border/20 bg-surfaceAlt/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                {getDirectionLabel(metric.measurementConfig.thresholdDirection)}
              </div>
              <StatusBadge status={metric.status} />
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {metric.basicDetails.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/68">
              <p className="font-medium text-ink/72">{metric.basicDetails.category}</p>
              <p>{metric.alertsOwnership.owner}</p>
            </div>
            <div className="mt-6">
              <ThresholdBar
                showDirectionLabel={false}
                direction={metric.measurementConfig.thresholdDirection}
                minimumValue={metric.measurementConfig.minimumValue}
                targetValue={metric.measurementConfig.targetValue}
                currentValue={health.currentValue}
                unit={metric.measurementConfig.unit}
                className="bg-white/50 dark:bg-slate-950/20"
              />
            </div>
          </div>
        </div>

        <SectionCard title="Actions" description="Control lifecycle state or jump into editing.">
          <MetricStatusToggle value={metric.status} onChange={handleStatusChange} />
          <div className="mt-6 space-y-3">
            <Link
              href={`/metrics/${metric.id}/edit`}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Edit metric
            </Link>
            <Link
              href="/metrics"
              className="inline-flex w-full items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-5 py-3 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to library
            </Link>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-border/20 bg-surfaceAlt/75 p-4 text-sm text-ink/65">
            Lifecycle status stays editable here without changing any threshold or ownership data.
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
        <SectionCard title="Metric profile" description="Definition, context, and system coverage.">
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-ink/45">Category</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.basicDetails.category}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Description</dt>
              <dd className="mt-1 text-base text-ink/70">{metric.basicDetails.description}</dd>
            </div>
            <div>
              <dt className="text-ink/45">Applicable AI systems</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {metric.basicDetails.applicableSystemTypes.map((systemType) => (
                  <span
                    key={systemType}
                    className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300"
                  >
                    {systemType}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard
          title="Measurement design"
          description="Where the reading comes from and how often it refreshes."
        >
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-ink/45">Data source</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.measurementConfig.dataSourceType}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Measurement frequency</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.measurementConfig.measurementFrequency}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Unit</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.measurementConfig.unit}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Ownership and alerts" description="People accountable for this metric.">
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-ink/45">Owner</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.alertsOwnership.owner}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Escalation</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                {metric.alertsOwnership.escalationPolicy}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Alert recipients</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {metric.alertsOwnership.alertRecipients.map((recipient) => (
                  <span
                    key={recipient}
                    className="rounded-full border border-border/20 bg-surfaceAlt/75 px-3 py-1 text-xs font-semibold text-ink/75"
                  >
                    {recipient}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-ink/45">Conditions</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {metric.alertsOwnership.alertConditions.map((condition) => (
                  <span
                    key={condition}
                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300"
                  >
                    {condition}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.75rem] border border-border/20 bg-surface/85 p-5 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            Created
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {formatDate(metric.createdAt)}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-border/20 bg-surface/85 p-5 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            Updated
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {formatDate(metric.updatedAt)}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-border/20 bg-surface/85 p-5 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            Guardrail
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {metric.measurementConfig.minimumValue ?? "Not set"}
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-border/20 bg-surface/85 p-5 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            Target
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {metric.measurementConfig.targetValue ?? "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};
