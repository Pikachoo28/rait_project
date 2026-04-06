import { EditMetricView } from "@/components/wizard/EditMetricView";

interface EditMetricPageProps {
  params: {
    metricId: string;
  };
}

export default function EditMetricPage({ params }: EditMetricPageProps) {
  return <EditMetricView metricId={params.metricId} />;
}
