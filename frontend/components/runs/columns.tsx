"use client";
import { ColumnDef } from "@tanstack/react-table";
import { JobExecution } from "@/types/dashboard.types";
import { ExecutionStatusBadge } from "./ExecutionStatusBadge";
import {
  ChevronRight,
  Timer,
  Activity,
  TerminalSquare,
  CalendarClock
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

// --- Helpers ---

function formatDuration(start: string | null, end: string | null): string {
  if (!start || !end) return "—";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}




export const executionColumns: ColumnDef<JobExecution>[] = [
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-2 mx-2 text-foreground">
        <span>Status</span>
      </div>
    ),
    cell: ({ row }) => <ExecutionStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2 text-foreground">
        <span>Started</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return (
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground/80">
            {format(date, "MMM d, h:mm a")}
          </span>
          <span className="text-xs text-muted-foreground hidden lg:inline-block">
            ({formatDistanceToNow(date, { addSuffix: true })})
          </span>
        </div>
      );
    },
  },
  {
    id: "duration",
    header: () => (
      <div className="flex items-center gap-2 text-foreground">
        <Timer className="h-4 w-4" />
        <span>Duration</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground/80">
        {formatDuration(row.original.startedAt, row.original.finishedAt)}
      </span>
    ),
  },
  {
    id: "log",
    header: () => (
      <div className="flex items-center gap-2 text-foreground">
        <TerminalSquare className="h-4 w-4" />
        <span>Log</span>
      </div>
    ),
    cell: ({ row }) => {
      const latestLog = row.original.logs?.[0]?.message;
      return (
        <span
          className="text-[11px] bg-muted/50 text-muted-foreground font-mono truncate block max-w-[280px] xl:max-w-[400px]"
          title={latestLog}
        >
          {latestLog || "—"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end pr-2">
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground/70 transition-colors" />
      </div>
    ),
  },
];