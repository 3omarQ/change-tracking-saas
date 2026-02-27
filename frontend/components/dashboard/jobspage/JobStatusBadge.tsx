import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "border-amber-200 text-amber-700 bg-amber-50",
  STARTED: "border-blue-200 text-blue-700 bg-blue-50",
  DONE: "border-emerald-200 text-emerald-700 bg-emerald-50",
  FAILED: "border-red-200 text-red-700 bg-red-50",
};

const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-amber-400",
  STARTED: "bg-blue-400 animate-pulse",
  DONE: "bg-emerald-400",
  FAILED: "bg-red-400",
};

export function JobStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs gap-1.5 ${STATUS_STYLES[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full inline-block ${STATUS_DOT[status]}`}
      />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
