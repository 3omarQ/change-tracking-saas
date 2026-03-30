import { DatapointEditSection } from "@/components/dashboard/shared/DatapointEditSection";
import { Job } from "@/types/dashboard.types";

export function DatapointSection({ job }: { job: Job }) {
  return (
    <DatapointEditSection
      datapoint={job.datapoint}
      invalidateKeys={[["job", job.id]]}
    />
  );
}