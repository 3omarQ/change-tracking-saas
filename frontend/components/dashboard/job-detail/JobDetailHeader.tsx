"use client";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobStatusBadge } from "@/components/dashboard/jobspage/JobStatusBadge";
import { Job } from "@/types/dashboard.types";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
  );
}

export function JobDetailHeader({ job }: { job: Job }) {
  const router = useRouter();
  const isDone = job.status === "DONE" || job.status === "FAILED";

  return (
    <div className="flex items-center gap-6">
      {/* Column 1: back button */}
      <BackButton />

      {/* Column 2: title + meta */}
      <div className="flex flex-col flex-1 gap-0.5">
        <div className=" font-semibold tracking-tight text-xl text-foreground">
          Job details
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-sm font-semibold text-muted-foreground">
            {job.datapoint.name}
          </div>
          <div className="text-muted-foreground text-xs">·</div>
          <div className="max-w-2xs truncate text-sm text-muted-foreground">
            {job.datapoint.targetUrl.url}
          </div>
          <JobStatusBadge status={job.status} />
        </div>
      </div>

      {/* Column 3: logs + results */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={!isDone}
          onClick={() => router.push(`/dashboard/jobs/${job.id}/logs`)}
        >
          <FileTextIcon className="h-3.5 w-3.5" />
          Logs
          <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0">
            {job._count.logs}
          </Badge>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={!isDone}
          onClick={() => router.push(`/dashboard/jobs/${job.id}/results`)}
        >
          <ExternalLinkIcon className="h-3.5 w-3.5" />
          Results
          <Badge variant="secondary" className="ml-0.5 text-xs px-1.5 py-0">
            {job._count.results}
          </Badge>
        </Button>
      </div>
    </div>
  );
}
