"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DatabaseIcon } from "lucide-react";
import { TargetURL } from "@/types/dashboard.types";
import { FaviconIcon } from "./FaviconIcon";
import { TargetStatusBadge } from "./TargetStatusBadge";
import { JobStatusBadge } from "./JobStatusBadge";
import { deriveJobCounts, jobsHref, datapointsHref } from "./helpers";
import { TargetCardActions } from "./TargetCardActions";

export function TargetCard({ target }: { target: TargetURL }) {
  const router = useRouter();
  const counts = deriveJobCounts(target.datapoints);
  const url = target.url;
  const baseUrl = target.baseUrl!;

  return (
    <Card
      onClick={() => router.push(jobsHref(url))}
      className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:border-border"
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <FaviconIcon url={url} />
          <span className="text-xs text-muted-foreground truncate flex-1">
            {url}
          </span>
          <TargetStatusBadge status={target.status} />
          <div onClick={(e) => e.stopPropagation()}>
            <TargetCardActions target={target} />
          </div>
        </div>

        <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors duration-150">
          {target.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
          <Link href={datapointsHref(baseUrl, url)}>
            <Badge
              variant="secondary"
              className="gap-1.5 text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <DatabaseIcon className="h-3 w-3" />
              {target._count.datapoints} datapoints
            </Badge>
          </Link>
          {counts.active > 0 && (
            <JobStatusBadge count={counts.active} status="active" href={jobsHref(url, "ACTIVE")} />
          )}
          {counts.paused > 0 && (
            <JobStatusBadge count={counts.paused} status="paused" href={jobsHref(url, "PAUSED")} />
          )}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/60">
          <div onClick={(e) => e.stopPropagation()}>
            <Link href={jobsHref(url)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {counts.total} total jobs
            </Link>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(target.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}