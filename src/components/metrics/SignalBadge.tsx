import { MetricSignalTone } from "@/lib/metricHealth";

interface SignalBadgeProps {
  tone: MetricSignalTone;
  label: string;
  className?: string;
}

const badgeStyles: Record<MetricSignalTone, string> = {
  good:
    "border-emerald-500/25 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  warning: "border-amber-500/25 bg-amber-500/12 text-amber-700 dark:text-amber-300",
  critical: "border-rose-500/25 bg-rose-500/12 text-rose-700 dark:text-rose-300",
  neutral: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300"
};

export const SignalBadge = ({ tone, label, className = "" }: SignalBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${badgeStyles[tone]} ${className}`}
  >
    {label}
  </span>
);

