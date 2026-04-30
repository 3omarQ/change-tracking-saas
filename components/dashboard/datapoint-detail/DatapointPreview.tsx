"use client";
import { useEffect } from "react";
import { PreviewToolbar } from "./PreviewToolbar";
import { PreviewFrame } from "./PreviewFrame";
import { useDatapointPreview } from "@/hooks/useDatapointPreview";
import { PreviewError } from "./PreviewError";
import { PreviewSkeleton } from "./PreviewSkeleton";

interface DatapointPreviewProps {
    url: string;
    selector: string;
}

export function DatapointPreview({ url, selector }: DatapointPreviewProps) {
    const { html, status, matchCount, error, load } = useDatapointPreview(url, selector);

    useEffect(() => { load(); }, [load]);

    return (
        <div className="rounded-lg border border-border overflow-hidden flex flex-col h-[500px]">
            <PreviewToolbar
                selector={selector}
                matchCount={matchCount}
                status={status}
                onReload={load}
            />
            <div className="flex-1 overflow-hidden relative">
                {!html && status === "loading" && <PreviewSkeleton />}
                {status === "error" && <PreviewError message={error ?? "Failed to load preview"} />}
                {html && <PreviewFrame html={html} />}
            </div>
        </div>
    );
}