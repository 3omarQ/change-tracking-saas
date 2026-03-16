import { Result } from "@/types/dashboard.types";

function extractText(result: Result): string {
	const def = result.definition as Record<string, unknown>;
	return typeof def?.text === "string" ? def.text : JSON.stringify(def, null, 2);
}

export function ExecutionResult({ results }: { results: Result[] }) {
	if (results.length === 0)
		return (
			<div className="text-sm text-muted-foreground">No results recorded.</div>
		);

	return (
		<div className="space-y-3">
			<h2 className="text-sm font-semibold text-foreground">Result</h2>
			<pre className="rounded-md border border-border bg-muted px-4 py-3 text-xs font-mono whitespace-pre-wrap break-words">
				{extractText(results[0])}
			</pre>
		</div>
	);
}