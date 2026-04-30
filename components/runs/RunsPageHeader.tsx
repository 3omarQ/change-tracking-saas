import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { Job } from "@/types/dashboard.types";

export function RunsPageHeader({ job }: { job: Job }) {
  return (
    <PageHeader
      title="Executions"
      meta={
        <>
          <span className="text-sm font-semibold text-muted-foreground">
            {job.datapoint.name}
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-sm text-muted-foreground truncate max-w-sm">
            {job.datapoint.targetUrl.name}
          </span>
        </>
      }
      showBackButton
    />
  );
}