import { Badge } from "@/components/ui/badge";
import { ExecutionStatus } from "@/types/dashboard.types";

const STYLES: Record<ExecutionStatus, string> = {
  PENDING: "border-muted-foreground/30 text-muted-foreground bg-muted",
  RUNNING: "border-primary/30 text-primary bg-primary/10",
  DONE: "border-emerald-200 text-emerald-700 bg-emerald-50",
  FAILED: "border-destructive/30 text-destructive bg-destructive/10",
};

const DOTS: Record<ExecutionStatus, string> = {
  PENDING: "bg-muted-foreground",
  RUNNING: "bg-primary animate-pulse",
  DONE: "bg-emerald-500",
  FAILED: "bg-destructive",
};

export function ExecutionStatusBadge({ status }: { status: ExecutionStatus }) {
  return (
    <Badge variant="outline" className={`text-xs gap-1.5 ${STYLES[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full inline-block ${DOTS[status]}`} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}