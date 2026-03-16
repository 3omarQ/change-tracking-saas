"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Datapoint } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";
import DatapointActions from "./DatapointActions";


export const datapointColumns: ColumnDef<Datapoint>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3"
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "path",
    header: "CSS / HTML Path",
    cell: ({ row }) => (
      <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono ">
        {row.getValue("path")}
      </code>
    ),
  },
  {
    accessorFn: (row) => row.targetUrl.url,
    id: "targetUrl",
    header: "Target URL",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground truncate block">
        {row.getValue("targetUrl")}
      </span>
    ),
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
    cell: ({ row }) => <DatapointActions datapoint={row.original} />,
  },

];
