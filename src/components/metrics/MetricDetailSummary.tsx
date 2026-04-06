"use client";

import Link from "next/link";

import { useMetrics } from "@/context/MetricsContext";
import { formatThresholdRange } from "@/lib/metrics";
import { MetricStatus } from "@/types/metric";

import { ArrowLeftIcon } from "@/components/ui/Icons";
import { SectionCard } from "@/components/ui/SectionCard";

import { MetricStatusToggle } from "./MetricStatusToggle";
import { StatusBadge } from "./StatusBadge";

interface MetricDetailSummaryProps {
  metricId: string;
}

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
          className="mt-4 inline-flex items-center rounded-full border border-border/40 bg-surface px-4 py-2.5 text-sm font-semibold text-accent transition hover:border-accent"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Return to the library
        </Link>
      </SectionCard>
    );
  }

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
      <div className="flex flex-col gap-4 rounded-4xl border border-border/40 bg-surface/90 p-6 shadow-panel lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/50">
            Metric Detail
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-ink">
              {metric.basicDetails.name}
            </h1>
            <StatusBadge status={metric.status} />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/70">{metric.basicDetails.description}</p>
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-ink/60">
            <span>
              Created <span className="font-medium text-ink">{formatDate(metric.createdAt)}</span>
            </span>
            <span>
              Updated <span className="font-medium text-ink">{formatDate(metric.updatedAt)}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/metrics"
            className="inline-flex items-center justify-center rounded-full border border-border/40 bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
          <Link
            href={`/metrics/${metric.id}/edit`}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-accent hover:text-canvas"
          >
            Edit Metric
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <SectionCard title="Basic Details">
            <dl className="grid gap-5 text-sm md:grid-cols-2">
              <div>
                <dt className="text-ink/50">Metric name</dt>
                <dd className="mt-1 font-medium text-ink">{metric.basicDetails.name}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Category</dt>
                <dd className="mt-1 font-medium text-ink">{metric.basicDetails.category}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-ink/50">Description</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.basicDetails.description || "No description provided"}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-ink/50">Applicable AI system types</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {metric.basicDetails.applicableSystemTypes.map((systemType) => (
                    <span
                      key={systemType}
                      className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent"
                    >
                      {systemType}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </SectionCard>

          <SectionCard title="Measurement Configuration">
            <dl className="grid gap-5 text-sm md:grid-cols-2">
              <div>
                <dt className="text-ink/50">Data source type</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.measurementConfig.dataSourceType}
                </dd>
              </div>
              <div>
                <dt className="text-ink/50">Measurement frequency</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.measurementConfig.measurementFrequency}
                </dd>
              </div>
              <div>
                <dt className="text-ink/50">Threshold direction</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.measurementConfig.thresholdDirection === "higher"
                    ? "Higher is better"
                    : "Lower is better"}
                </dd>
              </div>
              <div>
                <dt className="text-ink/50">Unit of measurement</dt>
                <dd className="mt-1 font-medium text-ink">{metric.measurementConfig.unit}</dd>
              </div>
              <div>
                <dt className="text-ink/50">
                  {metric.measurementConfig.thresholdDirection === "higher"
                    ? "Minimum acceptable value"
                    : "Maximum acceptable value"}
                </dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.measurementConfig.minimumValue ?? "Not configured"}
                </dd>
              </div>
              <div>
                <dt className="text-ink/50">Target value</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.measurementConfig.targetValue ?? "Not configured"}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-ink/50">Threshold range</dt>
                <dd className="mt-1 font-medium text-ink">
                  {formatThresholdRange(
                    metric.measurementConfig.thresholdDirection,
                    metric.measurementConfig.minimumValue,
                    metric.measurementConfig.targetValue,
                    metric.measurementConfig.unit
                  )}
                </dd>
              </div>
            </dl>
          </SectionCard>

          <SectionCard title="Alerts And Ownership">
            <dl className="grid gap-5 text-sm md:grid-cols-2">
              <div>
                <dt className="text-ink/50">Metric owner</dt>
                <dd className="mt-1 font-medium text-ink">{metric.alertsOwnership.owner}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Escalation policy</dt>
                <dd className="mt-1 font-medium text-ink">
                  {metric.alertsOwnership.escalationPolicy}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-ink/50">Alert recipients</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {metric.alertsOwnership.alertRecipients.map((recipient) => (
                    <span
                      key={recipient}
                      className="rounded-full bg-canvas px-3 py-1 text-xs font-semibold text-ink"
                    >
                      {recipient}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-ink/50">Alert conditions</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {metric.alertsOwnership.alertConditions.map((condition) => (
                    <span
                      key={condition}
                      className="rounded-full bg-canvas px-3 py-1 text-xs font-semibold text-ink"
                    >
                      {condition}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </SectionCard>
        </div>

        <SectionCard title="Status And Actions" className="max-h-fit">
          <MetricStatusToggle value={metric.status} onChange={handleStatusChange} />
          <div className="mt-6 rounded-3xl bg-canvas/80 p-4 text-sm text-ink/70">
            Use the toggle above to move this metric between Active, Draft, and Archived without
            leaving the detail view.
          </div>
          <div className="mt-6 space-y-3">
            <Link
              href={`/metrics/${metric.id}/edit`}
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-accent hover:text-canvas"
            >
              Edit This Metric
            </Link>
            <Link
              href="/metrics"
              className="inline-flex w-full items-center justify-center rounded-full border border-border/40 bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back To Library
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
