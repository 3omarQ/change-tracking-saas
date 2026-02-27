import { ClockIcon } from "lucide-react";
import { Job } from "@/types/dashboard.types";
import { formatDate } from "@/lib/utils";
import { JobDetailField } from "./JobDetailField";
import { JobDetailSection } from "./JobDetailSection";

export function MetadataSection({ job }: { job: Job }) {
  return (
    <JobDetailSection icon={ClockIcon} label="Metadata">
      <JobDetailField label="Created at" value={formatDate(job.createdAt)} />
      <JobDetailField label="Last updated" value={formatDate(job.updatedAt)} />
      <JobDetailField
        label="Job ID"
        value={
          <span className="text-xs text-muted-foreground font-mono">
            {job.id}
          </span>
        }
      />
    </JobDetailSection>
  );
}
