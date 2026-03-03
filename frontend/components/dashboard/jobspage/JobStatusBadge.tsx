import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "border-emerald-200 text-emerald-700 bg-emerald-50",
  PAUSED: "border-amber-200 text-amber-700 bg-amber-50",
};

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "bg-emerald-400",
  PAUSED: "bg-amber-400",
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
