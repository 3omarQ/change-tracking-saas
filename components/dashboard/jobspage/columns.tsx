"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ActivitySquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Job } from "@/types/dashboard.types";
import { JobStatusBadge } from "./JobStatusBadge";
import { FaviconIcon } from "../targetspage/FaviconIcon";

export const jobColumns: ColumnDef<Job>[] = [
  {
    id: "datapoint",
    accessorFn: (row) => row.datapoint.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Datapoint
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.original.datapoint.name}</span>
    ),
  },
  {
    id: "targetUrl",
    accessorFn: (row) => row.datapoint.targetUrl.url,
    header: "Target URL",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaviconIcon url={row.original.datapoint.targetUrl.url} />
        <span className="text-xs text-muted-foreground truncate max-w-[200px] block">
          {row.original.datapoint.targetUrl.url}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <JobStatusBadge status={row.getValue("status")} />,
  },
  {
    id: "configuration",
    header: "Extractor",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-medium">
          {row.original.extractorType}
        </Badge>
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-medium">
          {row.original.outputFormat}
        </Badge>
      </div>
    ),
  },
  {
    id: "executions",
    header: "Executions",
    cell: ({ row }) => {
      const executionsCount = row.original._count?.executions || 0;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/dashboard/jobs/${row.original.id}/runs`}
            className="inline-flex w-full items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ActivitySquare className="h-3.5 w-3.5" />
            <span className="font-medium">{executionsCount}</span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className=" text-sm text-muted-foreground pr-2">
        {new Date(row.getValue("createdAt")).toLocaleDateString("en-US", {
          dateStyle: "medium"
        })}
      </div>)
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end pr-2">
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground/70" />
      </div>
    ),
  },
];