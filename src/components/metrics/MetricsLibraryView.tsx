"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useMetrics } from "@/context/MetricsContext";
import { useMetricFilters } from "@/hooks/useMetricFilters";
import { PlusIcon } from "@/components/ui/Icons";

import { MetricCard } from "./MetricCard";
import { MetricsFilterBar } from "./MetricsFilterBar";

const METRIC_SUCCESS_TOAST_KEY = "rait-metrics-success-toast";

export const MetricsLibraryView = () => {
  const { metrics } = useMetrics();
  const { filters, filteredMetrics, setSearch, setCategory, setStatus } =
    useMetricFilters(metrics);
  const [successToast, setSuccessToast] = useState<string>("");

  useEffect(() => {
    const toastMessage = window.sessionStorage.getItem(METRIC_SUCCESS_TOAST_KEY);

    if (!toastMessage) {
      return;
    }

    setSuccessToast(toastMessage);
    window.sessionStorage.removeItem(METRIC_SUCCESS_TOAST_KEY);

    const timeoutId = window.setTimeout(() => {
      setSuccessToast("");
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="space-y-6">
      {successToast ? (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
          <div
            role="status"
            aria-live="polite"
            className="rounded-3xl border border-accent/20 bg-accentSoft px-4 py-3 text-sm font-medium text-accent shadow-panel"
          >
            {successToast}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ink/50">
            Responsible AI Metrics
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">
            Metric Configuration Wizard
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-ink/70">
            Create, configure, and manage fairness, transparency, safety, privacy, and governance
            metrics in a structured product workflow.
          </p>
        </div>
        <Link
          href="/metrics/new"
          className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-accent hover:text-canvas"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Metric
        </Link>
      </div>

      <MetricsFilterBar
        filters={filters}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">
          Showing <span className="font-semibold text-ink">{filteredMetrics.length}</span> of{" "}
          <span className="font-semibold text-ink">{metrics.length}</span> configured metrics
        </p>
      </div>

      {filteredMetrics.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <div className="rounded-4xl border border-dashed border-border/40 bg-surface/70 p-10 text-center">
          <h2 className="text-lg font-semibold">No metrics match these filters</h2>
          <p className="mt-2 text-sm text-ink/65">
            Clear the search or broaden category and status filters.
          </p>
        </div>
      )}
    </div>
  );
};
