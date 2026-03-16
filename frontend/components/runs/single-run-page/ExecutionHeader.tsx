import { ExecutionWithResults } from "@/types/dashboard.types";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { ExecutionStatusBadge } from "../ExecutionStatusBadge";

function formatDuration(start: string | null, end: string | null): string {
	if (!start || !end) return "—";
	const ms = new Date(end).getTime() - new Date(start).getTime();
	if (ms < 1000) return `${ms}ms`;
	return `${(ms / 1000).toFixed(1)}s`;
}

export function ExecutionHeader({ execution }: { execution: ExecutionWithResults }) {
	return (
		<PageHeader
			title="Execution"
			showBackButton
			meta={
				<div className="flex items-center gap-3">
					<ExecutionStatusBadge status={execution.status} />
					<span className="text-xs text-muted-foreground">
						{new Date(execution.createdAt).toLocaleString()}
					</span>
					<span className="text-xs text-muted-foreground">
						{formatDuration(execution.startedAt, execution.finishedAt)}
					</span>
				</div>
			}
		/>
	);
}