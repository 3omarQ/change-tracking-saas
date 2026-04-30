import { ExecutionWithResults } from "@/types/dashboard.types";
import { DiffViewer } from "./DiffViewer";

interface LatestRunsComparisonProps {
  executions: ExecutionWithResults[];
  format: "TXT" | "JSON" | "MD";
}

function extractText(execution: ExecutionWithResults): string {
  const result = execution.results[0];
  if (!result) return "";
  const def = result.definition as Record<string, unknown>;
  if (typeof def.text === "string") return def.text;
  return JSON.stringify(def, null, 2);
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString();
}

export function LatestRunsComparison({ executions, format }: LatestRunsComparisonProps) {
  if (executions.length < 2) return null;

  const [latest, previous] = executions;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Latest comparison
        </h2>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            Previous:{" "}
            <span className="font-medium text-foreground">
              {formatDate(previous.finishedAt)}
            </span>
          </span>
          <span>
            Latest:{" "}
            <span className="font-medium text-foreground">
              {formatDate(latest.finishedAt)}
            </span>
          </span>
        </div>
      </div>
      <DiffViewer
        oldValue={extractText(previous)}
        newValue={extractText(latest)}
        format={format}
      />
    </div>
  );
}