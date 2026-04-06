import Link from "next/link";

import { ArrowLeftIcon } from "@/components/ui/Icons";
import { MetricWizard } from "@/components/wizard/MetricWizard";

export default function NewMetricPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/metrics"
        className="inline-flex items-center justify-center rounded-full border border-border/40 bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to metrics
      </Link>
      <MetricWizard mode="create" />
    </div>
  );
}
