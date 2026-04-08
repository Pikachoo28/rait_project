"use client";

import Link from "next/link";

import { useMetrics } from "@/context/MetricsContext";
import { mapMetricToFormValues } from "@/lib/metrics";
import { ArrowLeftIcon } from "@/components/ui/Icons";

import { MetricWizard } from "./MetricWizard";

interface EditMetricViewProps {
  metricId: string;
}

export const EditMetricView = ({ metricId }: EditMetricViewProps) => {
  const { getMetricById } = useMetrics();
  const metric = getMetricById(metricId);

  if (!metric) {
    return (
      <div className="space-y-6">
        <Link
          href="/metrics"
          className="inline-flex items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to metrics
        </Link>
        <div className="rounded-[2rem] border border-border/25 bg-surface/90 p-6 shadow-panel">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Metric not found</h1>
          <p className="mt-3 text-sm text-ink/70">
            The metric you attempted to edit is not available in the current in-memory session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/metrics/${metric.id}`}
        className="inline-flex items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to detail
      </Link>
      <MetricWizard
        mode="edit"
        metricId={metric.id}
        initialValues={mapMetricToFormValues(metric)}
        previewStatus={metric.status}
      />
    </div>
  );
};
