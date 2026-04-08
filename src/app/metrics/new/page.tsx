import Link from "next/link";

import { ArrowLeftIcon } from "@/components/ui/Icons";
import { MetricWizard } from "@/components/wizard/MetricWizard";

export default function NewMetricPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/metrics"
        className="inline-flex items-center justify-center rounded-full border border-border/25 bg-surfaceAlt px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-sky-500/30 hover:text-sky-700 dark:hover:text-sky-300"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to metrics
      </Link>
      <MetricWizard mode="create" />
    </div>
  );
}
