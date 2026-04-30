"use client";
import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

interface DiffViewerProps {
  oldValue: string;
  newValue: string;
  format: "TXT" | "JSON" | "MD";
}

const PREVIEW_LENGTH = 1500;

function prepareValue(value: string, format: "TXT" | "JSON" | "MD"): string {
  if (format === "JSON") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }
  return value;
}

export function DiffViewer({ oldValue, newValue, format }: DiffViewerProps) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const prepared = {
    old: prepareValue(oldValue, format),
    new: prepareValue(newValue, format),
  };

  const filterLines = (value: string) => {
    if (!search.trim()) return value;
    return value
      .split("\n")
      .filter((line) => line.toLowerCase().includes(search.toLowerCase()))
      .join("\n");
  };

  const old = filterLines(
    expanded ? prepared.old : prepared.old.slice(0, PREVIEW_LENGTH)
  );
  const next = filterLines(
    expanded ? prepared.new : prepared.new.slice(0, PREVIEW_LENGTH)
  );

  const isTruncated =
    !expanded &&
    (prepared.old.length > PREVIEW_LENGTH || prepared.new.length > PREVIEW_LENGTH);

  return (
    <div className="space-y-3">
      <Input
        placeholder="Filter lines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 text-xs max-w-xs"
      />
      <div className="rounded-lg border border-border/60 overflow-hidden text-xs">
        <ReactDiffViewer
          oldValue={old}
          newValue={next}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
          leftTitle="Previous run"
          rightTitle="Latest run"
          useDarkTheme={false}
          styles={{
            variables: {
              light: {
                diffViewerBackground: "hsl(180, 30%, 98%)",
                addedBackground: "hsl(142, 76%, 95%)",
                addedColor: "hsl(142, 72%, 29%)",
                removedBackground: "hsl(4, 86%, 97%)",
                removedColor: "hsl(4, 86%, 40%)",
                wordAddedBackground: "hsl(142, 76%, 88%)",
                wordRemovedBackground: "hsl(4, 86%, 90%)",
                codeFoldBackground: "hsl(182, 18%, 94%)",
                codeFoldContentColor: "hsl(192, 12%, 44%)",
              },
            },
          }}
        />
      </div>
      {isTruncated && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 text-xs"
          onClick={() => setExpanded(true)}
        >
          <ChevronDownIcon className="h-3.5 w-3.5" />
          Show full content
        </Button>
      )}
    </div>
  );
}