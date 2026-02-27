import { LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobDetailSection } from "./JobDetailSection";
import { JobDetailField } from "./JobDetailField";
import { Job } from "@/types/dashboard.types";

export function TargetUrlSection({ job }: { job: Job }) {
  return (
    <JobDetailSection icon={LinkIcon} label="Target URL">
      <JobDetailField label="Page title" value={job.datapoint.targetUrl.name} />
      <JobDetailField
        label="URL"
        value={
          <a
            href={job.datapoint.targetUrl.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-xs break-all"
          >
            {job.datapoint.targetUrl.url}
          </a>
        }
      />
      <JobDetailField
        label="Status"
        value={
          <Badge
            variant="outline"
            className={
              job.datapoint.targetUrl.status === "ACTIVE"
                ? "border-emerald-200 text-emerald-700 bg-emerald-50 text-xs"
                : "border-red-200 text-red-700 bg-red-50 text-xs"
            }
          >
            {job.datapoint.targetUrl.status}
          </Badge>
        }
      />
    </JobDetailSection>
  );
}
