import { Log } from "@/types/dashboard.types";
import { cn } from "@/lib/utils";

const levelStyles: Record<Log["level"], string> = {
	INFO: "text-blue-600",
	WARN: "text-amber-600",
	ERROR: "text-red-600",
	DEBUG: "text-muted-foreground",
};

export function ExecutionLogs({ logs }: { logs: Log[] }) {
	if (logs.length === 0)
		return <div className="text-sm text-muted-foreground">No logs.</div>;

	return (
		<div className="space-y-3">
			<h2 className="text-sm font-semibold text-foreground">Logs</h2>
			<div className="rounded-md border border-border bg-muted divide-y divide-border/60">
				{logs.map((log) => (
					<div key={log.id} className="flex items-start gap-3 px-4 py-2">
						<span className={cn("text-xs font-mono font-semibold w-10 shrink-0", levelStyles[log.level])}>
							{log.level}
						</span>
						<span className="text-xs font-mono text-foreground flex-1 break-words">
							{log.message}
						</span>
						<span className="text-xs text-muted-foreground shrink-0">
							{new Date(log.date).toLocaleTimeString()}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}