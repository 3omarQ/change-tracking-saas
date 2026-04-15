"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Datapoint } from "@/types/dashboard.types";
import { format } from "date-fns";
import DatapointActions from "./DatapointActions";
import { FaviconIcon } from "../targetspage/FaviconIcon";



export const datapointColumns: ColumnDef<Datapoint>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 hover:bg-transparent"
      >
        Name <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm text-foreground">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorFn: (row) => row.targetUrl.url,
    id: "targetUrl",
    header: "Target URL",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FaviconIcon url={row.original.targetUrl.url} />
        <span className="text-xs text-muted-foreground truncate max-w-[200px] block">
          {row.original.targetUrl.url}
        </span>
      </div>
    ),
  },
  {
    id: "extraction",
    header: "Extracts",
    cell: ({ row }) => {
      const fieldNames = row.original.fieldNames;
      const path = row.original.path;

      if (fieldNames) {
        return (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {(JSON.parse(fieldNames as string) as string[]).map((f, i) => (
              <span
                key={i}
                className="text-[11px] bg-muted border border-border rounded px-2 py-0.5 text-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        );
      }

      return (
        <code
          className="text-xs bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded font-mono truncate max-w-[250px] block"
          title={path}
        >
          {path}
        </code>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex items-center justify-end">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-mr-3 hover:bg-transparent"
        >
          Created
          <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right text-sm text-muted-foreground pr-2">
        {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DatapointActions datapoint={row.original} />
      </div>
    ),
  },
];