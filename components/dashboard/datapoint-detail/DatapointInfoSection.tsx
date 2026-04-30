import { DatapointEditSection } from "@/components/dashboard/shared/DatapointEditSection";
import { LinkIcon } from "lucide-react";
import { JobDetailSection } from "@/components/dashboard/job-detail/JobDetailSection";
import { JobDetailField } from "@/components/dashboard/job-detail/JobDetailField";
import { Badge } from "@/components/ui/badge";
import { Datapoint } from "@/types/dashboard.types";

export function DatapointInfoSection({ datapoint }: { datapoint: Datapoint }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DatapointEditSection
        datapoint={datapoint}
        invalidateKeys={[["datapoint", datapoint.id], ["datapoints"]]}
      />
      <JobDetailSection icon={LinkIcon} label="Target URL">
        <JobDetailField label="Name" value={datapoint.targetUrl.name} />
        <JobDetailField
          label="URL"
          value={
            <a href={datapoint.targetUrl.url} target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline text-xs break-all">
              {datapoint.targetUrl.url}
            </a>
          }
        />
        <JobDetailField
          label="Status"
          value={
            <Badge variant="outline" className={
              datapoint.targetUrl.status === "ACTIVE"
                ? "border-emerald-200 text-emerald-700 bg-emerald-50 text-xs"
                : "border-red-200 text-red-700 bg-red-50 text-xs"
            }>
              {datapoint.targetUrl.status}
            </Badge>
          }
        />
      </JobDetailSection>
    </div>
  );
}