import { MetricDetailSummary } from "@/components/metrics/MetricDetailSummary";

interface MetricDetailPageProps {
  params: {
    metricId: string;
  };
}

export default function MetricDetailPage({ params }: MetricDetailPageProps) {
  return <MetricDetailSummary metricId={params.metricId} />;
}
