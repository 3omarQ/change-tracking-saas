"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileTextIcon, Loader2Icon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { JobStatusBadge } from "@/components/dashboard/jobspage/JobStatusBadge";
import { JobStatusToggle } from "./JobStatusToggle";
import { Job } from "@/types/dashboard.types";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function JobDetailHeader({ job }: { job: Job }) {
  const router = useRouter();
  const hasRuns = job._count.executions > 0;
  const [isRunning, setIsRunning] = useState(false);
  const queryClient = useQueryClient();

  const handleRun = async () => {
    setIsRunning(true);
    try {
      await apiClient.post(`/jobs/${job.id}/run`);
      toast.success("Job started.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
    } catch {
      toast.error("Failed to run job.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <PageHeader
      title="Job details"
      showBackButton
      meta={
        <>
          <span className="text-sm font-semibold text-muted-foreground">
            {job.datapoint.name}
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-sm text-muted-foreground truncate max-w-sm">
            {job.datapoint.targetUrl.url}
          </span>
          <JobStatusBadge status={job.status} />
        </>
      }
      actions={
        <>
          <JobStatusToggle job={job} />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={!hasRuns}
            onClick={() => router.push(`/dashboard/jobs/${job.id}/runs`)}
          >
            <FileTextIcon className="h-3.5 w-3.5" />
            Executions
            <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0">
              {job._count.executions}
            </Badge>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <PlayIcon className="h-3.5 w-3.5" />
            )}
            Run
          </Button>
        </>
      }
    />
  );
}