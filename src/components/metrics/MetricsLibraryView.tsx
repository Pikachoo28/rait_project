"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { getMetricHealth } from "@/lib/metricHealth";
import { useMetrics } from "@/context/MetricsContext";
import { useMetricFilters } from "@/hooks/useMetricFilters";
import { LayersIcon, PlusIcon, PulseIcon } from "@/components/ui/Icons";

import { MetricCard } from "./MetricCard";
import { MetricsFilterBar } from "./MetricsFilterBar";

const METRIC_SUCCESS_TOAST_KEY = "rait-metrics-success-toast";

const summaryToneStyles = {
  critical:
    "border-rose-500/20 bg-gradient-to-br from-rose-500/12 via-surface to-surface text-rose-700 dark:text-rose-300",
  warning:
    "border-amber-500/20 bg-gradient-to-br from-amber-500/12 via-surface to-surface text-amber-700 dark:text-amber-300",
  good:
    "border-emerald-500/20 bg-gradient-to-br from-emerald-500/12 via-surface to-surface text-emerald-700 dark:text-emerald-300",
  neutral:
    "border-sky-500/15 bg-gradient-to-br from-sky-500/12 via-surface to-surface text-sky-700 dark:text-sky-300"
};

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

  const summary = useMemo(() => {
    return filteredMetrics.reduce(
      (accumulator, metric) => {
        const tone = getMetricHealth(metric).tone;

        accumulator[tone] += 1;
        return accumulator;
      },
      {
        critical: 0,
        warning: 0,
        good: 0,
        neutral: 0
      }
    );
  }, [filteredMetrics]);

  return (
    <div className="space-y-6">
      {successToast ? (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
          <div
            role="status"
            aria-live="polite"
            className="rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/12 px-4 py-3 text-sm font-medium text-emerald-700 shadow-panel dark:text-emerald-300"
          >
            {successToast}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-sky-500/20 bg-surface/90 p-7 shadow-panel">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-sky-500/12 via-sky-500/5 to-transparent" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              <LayersIcon className="h-4 w-4" />
              Risk command view
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Responsible AI metrics at a glance.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/68">
              Each card encodes health as color, position, and status language so risk is clear
              before anyone reads the raw numbers.
            </p>
          </div>
        </div>

        <Link
          href="/metrics/new"
          className="group rounded-[2.25rem] border border-border/20 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-7 text-white shadow-panel transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,23,42,0.35)]"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <PlusIcon className="h-5 w-5" />
            </div>
            <div>
              <p className=" text-2xl font-semibold tracking-tight">Create new metric</p>
              <p className="mt-3 text-sm text-white/70">
                Add thresholds, owners, and alerts through the four-step wizard.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.85rem] border border-border/20 bg-surface/85 p-5 shadow-panel">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700 dark:text-sky-300">
              <PulseIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                Visible metrics
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                {filteredMetrics.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-[1.85rem] border p-5 shadow-panel ${summaryToneStyles.critical}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Critical</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{summary.critical}</p>
          <p className="mt-1 text-sm text-ink/55 dark:text-white/65">Immediate review required</p>
        </div>

        <div
          className={`rounded-[1.85rem] border p-5 shadow-panel ${summaryToneStyles.warning}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Warning</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{summary.warning}</p>
          <p className="mt-1 text-sm text-ink/55 dark:text-white/65">Watchlist metrics</p>
        </div>

        <div className={`rounded-[1.85rem] border p-5 shadow-panel ${summaryToneStyles.good}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Safe</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{summary.good}</p>
          <p className="mt-1 text-sm text-ink/55 dark:text-white/65">Within target band</p>
        </div>
      </div>

      <MetricsFilterBar
        filters={filters}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      {filteredMetrics.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-border/25 bg-surface/80 p-12 text-center shadow-panel">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            No metrics match these filters
          </h2>
          <p className="mt-2 text-sm text-ink/65">
            Clear the search or broaden the selected category and lifecycle status.
          </p>
        </div>
      )}
    </div>
  );
};
