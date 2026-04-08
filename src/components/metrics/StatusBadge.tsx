import { MetricStatus } from "@/types/metric";

const statusStyles: Record<MetricStatus, string> = {
  active:
    "border-emerald-500/25 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  draft: "border-amber-500/25 bg-amber-500/12 text-amber-700 dark:text-amber-300",
  archived: "border-slate-500/20 bg-slate-500/12 text-slate-700 dark:text-slate-300"
};

interface StatusBadgeProps {
  status: MetricStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusStyles[status]}`}
  >
    {status}
  </span>
);
