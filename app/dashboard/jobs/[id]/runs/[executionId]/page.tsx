"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { executionsService } from "@/services/executions.service";
import { Separator } from "@/components/ui/separator";
import { ExecutionHeader } from "@/components/runs/single-run-page/ExecutionHeader";
import { ExecutionLogs } from "@/components/runs/single-run-page/ExecutionLogs";
import { ExecutionResult } from "@/components/runs/single-run-page/ExecutionResult";
import { useExecutionLogs } from "@/hooks/useExecutionLogs";
import { useMemo } from "react";

export default function ExecutionPage() {
	const { id: jobId, executionId } = useParams<{ id: string; executionId: string }>();

	const { data: execution, isLoading } = useQuery({
		queryKey: ["execution", jobId, executionId],
		queryFn: () => executionsService.getOne(jobId, executionId),
		refetchInterval: (query) =>
			query.state.data?.status === 'RUNNING' ? 3000 : false,

	});

	const isLive = execution?.status === 'RUNNING';
	const initialLogs = useMemo(() => execution?.logs ?? [], [execution?.logs]);
	const logs = useExecutionLogs(executionId, initialLogs);

	if (isLoading) return (
		<div className="py-24 text-center text-sm text-muted-foreground">
			Loading execution...
		</div>
	);
	if (!execution) return null;

	return (
		<div className="space-y-6 pb-16">
			<ExecutionHeader execution={execution} />
			<Separator />
			<ExecutionResult results={execution.results} format={execution.job.outputFormat} />
			<Separator />
			<ExecutionLogs logs={logs} isLive={isLive} />
		</div>
	);
}