"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Job } from "@/types/dashboard.types";
import { JobStatusBadge } from "./JobStatusBadge";

function ActionCell({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => router.push(`/dashboard/jobs/${id}`)}
    >
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
  );
}

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
      <span className="text-xs text-muted-foreground truncate max-w-[200px] block">
        {row.original.datapoint.targetUrl.url}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <JobStatusBadge status={row.getValue("status")} />,
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
      <span className="text-sm text-muted-foreground">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
