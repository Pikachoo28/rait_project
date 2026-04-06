import { MetricStatus } from "@/types/metric";

const statusStyles: Record<MetricStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  draft: "bg-amber-100 text-amber-800",
  archived: "bg-slate-200 text-slate-700"
};

interface StatusBadgeProps {
  status: MetricStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}>
    {status}
  </span>
);
