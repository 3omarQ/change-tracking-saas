"use client";
import { useRouter } from "next/navigation";
import { JobExecution } from "@/types/dashboard.types";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { executionColumns } from "./columns";

interface ExecutionHistoryTableProps {
  executions: JobExecution[];
  jobId: string;
}

export function ExecutionHistoryTable({ executions, jobId }: ExecutionHistoryTableProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Execution history</h2>
      <DataTable
        columns={executionColumns}
        data={executions}
        globalFilter=""
        entityName="execution"
        onRowClick={(row) => router.push(`/dashboard/jobs/${jobId}/runs/${row.id}`)}
      />
    </div>
  );
}