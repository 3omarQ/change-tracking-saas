import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DatabaseIcon } from "lucide-react";
import { TargetURL } from "@/types/dashboard.types";
import Image from "next/image";

interface TargetCardProps {
  target: TargetURL;
}

function FaviconIcon({ url }: { url: string }) {
  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  return (
    <Image
      src={faviconUrl}
      alt={domain}
      width={16}
      height={16}
      className="h-4 w-4 rounded-sm object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function deriveJobCounts(datapoints: TargetURL["datapoints"]) {
  const allJobs = datapoints.flatMap((d) => d.jobs);
  return {
    pending: allJobs.filter((j) => j.status === "PENDING").length,
    started: allJobs.filter((j) => j.status === "STARTED").length,
    done: allJobs.filter((j) => j.status === "DONE").length,
    failed: allJobs.filter((j) => j.status === "FAILED").length,
  };
}

function JobStatusBadges({
  datapoints,
}: {
  datapoints: TargetURL["datapoints"];
}) {
  const counts = deriveJobCounts(datapoints);
  const total = counts.pending + counts.started + counts.done + counts.failed;
  if (total === 0) return null;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {counts.pending > 0 && (
        <Badge
          variant="outline"
          className="text-xs gap-1 border-amber-200 text-amber-700 bg-amber-50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
          {counts.pending} pending
        </Badge>
      )}
      {counts.started > 0 && (
        <Badge
          variant="outline"
          className="text-xs gap-1 border-blue-200 text-blue-700 bg-blue-50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />
          {counts.started} running
        </Badge>
      )}
      {counts.done > 0 && (
        <Badge
          variant="outline"
          className="text-xs gap-1 border-emerald-200 text-emerald-700 bg-emerald-50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
          {counts.done} done
        </Badge>
      )}
      {counts.failed > 0 && (
        <Badge
          variant="outline"
          className="text-xs gap-1 border-red-200 text-red-700 bg-red-50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 inline-block" />
          {counts.failed} failed
        </Badge>
      )}
    </div>
  );
}

export function TargetCard({ target }: TargetCardProps) {
  const totalJobs = target.datapoints.flatMap((d) => d.jobs).length;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:border-border">
      <CardContent className="p-5 space-y-4">
        {/* Top row: favicon + url + status */}
        <div className="flex items-center gap-2">
          <FaviconIcon url={target.url} />
          <span className="text-xs text-muted-foreground truncate flex-1">
            {target.url}
          </span>
          <Badge
            variant="outline"
            className={
              target.status === "ACTIVE"
                ? "text-xs border-emerald-200 text-emerald-700 bg-emerald-50"
                : "text-xs border-red-200 text-red-700 bg-red-50"
            }
          >
            {target.status === "ACTIVE" ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors duration-150">
          {target.name}
        </h3>

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/dashboard/datapoints?target=${target.id}`}>
            <Badge
              variant="secondary"
              className="gap-1.5 text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <DatabaseIcon className="h-3 w-3" />
              {target._count.datapoints} datapoints
            </Badge>
          </Link>
          <JobStatusBadges datapoints={target.datapoints} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            {totalJobs} total jobs
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(target.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
