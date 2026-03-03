"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { executionsService } from "@/services/executions.service";
import { jobService } from "@/services/jobs.service";
import { Separator } from "@/components/ui/separator";
import { ExecutionHistoryTable } from "@/components/runs/ExecutionHistoryTable";
import { LatestRunsComparison } from "@/components/runs/LatestRunsComparison";
import { RunsPageHeader } from "@/components/runs/RunsPageHeader";

export default function RunsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobService.getById(id),
  });

  const { data: latestExecutions = [], isLoading: latestLoading } = useQuery({
    queryKey: ["executions-latest", id],
    queryFn: () => executionsService.getLatestDone(id),
  });

  const { data: allExecutions = [], isLoading: allLoading } = useQuery({
    queryKey: ["executions-all", id],
    queryFn: () => executionsService.getAll(id),
  });

  if (jobLoading || latestLoading || allLoading)
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        Loading executions...
      </div>
    );

  if (!job) return null;

  return (
    <div className="space-y-6 pb-16">
      <RunsPageHeader job={job} />
      <LatestRunsComparison
        executions={latestExecutions}
        format={job.outputFormat}
      />
      {latestExecutions.length >= 2 && <Separator />}
      <ExecutionHistoryTable executions={allExecutions} jobId={id} />
    </div>
  );
}