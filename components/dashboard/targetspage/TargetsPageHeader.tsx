import { CreateJobButton } from "@/components/dashboard/shared/CreateJobButton";

interface TargetsPageHeaderProps {
  totalJobs: number;
  totalDatapoints: number;
}

export function TargetsPageHeader({
  totalJobs,
  totalDatapoints,
}: TargetsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Current Targets
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">{totalJobs}</span>
            jobs
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {totalDatapoints}
            </span>
            datapoints
          </span>
        </div>
      </div>

      <CreateJobButton />
    </div>
  );
}
