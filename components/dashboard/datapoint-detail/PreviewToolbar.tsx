import { RefreshCwIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PreviewToolbarProps {
    selector: string;
    matchCount: number;
    status: "idle" | "loading" | "ready" | "error";
    onReload: () => void;
}

export function PreviewToolbar({ selector, matchCount, status, onReload }: PreviewToolbarProps) {
    return (
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2 min-w-0">
                <EyeIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <code className="text-xs font-mono text-foreground truncate">{selector}</code>
                {status === "ready" && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                        {matchCount} {matchCount === 1 ? "match" : "matches"}
                    </Badge>
                )}
                {status === "error" && (
                    <Badge variant="destructive" className="text-xs shrink-0">
                        No match
                    </Badge>
                )}
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 shrink-0"
                onClick={onReload}
                disabled={status === "loading"}
            >
                {status === "loading" ? (
                    <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                ) : (
                    <RefreshCwIcon className="h-3.5 w-3.5" />
                )}
            </Button>
        </div>
    );
}