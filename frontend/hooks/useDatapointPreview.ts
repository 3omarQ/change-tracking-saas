import { useState, useEffect, useCallback } from "react";

export type PreviewStatus = "idle" | "loading" | "ready" | "error";

interface PreviewState {
  html: string | null;
  status: PreviewStatus;
  matchCount: number;
  error: string | null;
}

export function useDatapointPreview(url: string, selector: string) {
  const [state, setState] = useState<PreviewState>({
    html: null,
    status: "idle",
    matchCount: 0,
    error: null,
  });

  const load = useCallback(async () => {
    // no url => hard reset state
    if (!url?.trim()) {
      setState({
        html: null,
        status: "idle",
        matchCount: 0,
        error: null,
      });
      return;
    }

    setState((s) => ({ ...s, status: "loading", error: null }));

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/preview?url=${encodeURIComponent(url)}&selector=${encodeURIComponent(selector)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Failed to load preview");

      const html = await res.text();

      // IMPORTANT: status ready as soon as HTML arrives
      setState((s) => ({ ...s, html, status: "ready" }));
    } catch (e) {
      setState((s) => ({
        ...s,
        status: "error",
        error: e instanceof Error ? e.message : "Unknown error",
      }));
    }
  }, [url, selector]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      // only update preview metadata, never re-trigger loading state here
      if (e.data?.type === "PREVIEW_READY") {
        setState((s) => ({ ...s, matchCount: e.data.count }));
      }
      if (e.data?.type === "PREVIEW_ERROR") {
        setState((s) => ({ ...s, matchCount: 0, error: e.data.message }));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return { ...state, load };
}