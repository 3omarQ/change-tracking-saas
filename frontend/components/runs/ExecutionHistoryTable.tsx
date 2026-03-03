"use client";
import { useMemo } from "react";
import { ExecutionSummary } from "@/types/dashboard.types";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { buildExecutionColumns } from "./columns";

interface ExecutionHistoryTableProps {
  executions: ExecutionSummary[];
  jobId: string;
}

export function ExecutionHistoryTable({ executions, jobId }: ExecutionHistoryTableProps) {
  const columns = useMemo(() => buildExecutionColumns(jobId), [jobId]);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Execution history</h2>
      <DataTable
        columns={columns}
        data={executions}
        globalFilter=""
        entityName="executions"
      />
    </div>
  );
}