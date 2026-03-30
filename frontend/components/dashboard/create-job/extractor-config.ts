import { SparklesIcon, WrenchIcon } from "lucide-react";

export type OutputFormat = "json" | "md" | "txt";
export type ExtractorType = "smart" | "basic";

export const FORMAT_LABELS: Record<OutputFormat, string> = {
  json: "JSON",
  md: "Markdown",
  txt: "Plain text",
};

export const EXTRACTORS = [
  {
    value: "smart" as ExtractorType,
    icon: SparklesIcon,
    title: "Smart extractor",
    badge: "AI",
    description:
      "Uses AI to intelligently parse and structure extracted content. Ideal for unstructured pages.",
    formats: ["json", "md","txt"] as OutputFormat[],
  },
  {
    value: "basic" as ExtractorType,
    icon: WrenchIcon,
    title: "Basic extractor",
    badge: null,
    description:
      "Runs your extraction script directly and returns raw output. Fast, predictable, and deterministic.",
    formats: ["json", "md", "txt"] as OutputFormat[],
  },
];
