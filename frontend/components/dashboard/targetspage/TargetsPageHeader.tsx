import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface TargetsPageHeaderProps {
  totalJobs: number;
  totalDatapoints: number;
}

export function TargetsPageHeader({
  totalJobs,
  totalDatapoints,
}: TargetsPageHeaderProps) {
  const router = useRouter();
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

      <Button
        className="gap-2"
        onClick={() => {
          router.push("/dashboard/jobs/create-job");
        }}
      >
        <PlusIcon className="h-4 w-4" />
        Build new job
      </Button>
    </div>
  );
}
