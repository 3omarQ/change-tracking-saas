"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ExecutionSummary } from "@/types/dashboard.types";
import { ExecutionStatusBadge } from "./ExecutionStatusBadge";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

function formatDuration(start: string | null, end: string | null): string {
  if (!start || !end) return "—";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function buildExecutionColumns(jobId: string): ColumnDef<ExecutionSummary>[] {
  return [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <ExecutionStatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Started at",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.getValue("createdAt")).toLocaleString()}
        </span>
      ),
    },
    {
      id: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDuration(row.original.startedAt, row.original.finishedAt)}
        </span>
      ),
    },
    {
      id: "logs",
      header: "Logs",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original._count.logs}
        </span>
      ),
    },
    {
      id: "results",
      header: "Results",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original._count.results}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Link href={`/dashboard/jobs/${jobId}/executions/${row.original.id}`}>
          <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        </Link>
      ),
    },
  ];
}