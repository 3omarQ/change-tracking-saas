import { Control } from "react-hook-form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { EXTRACTORS, OutputFormat } from "./extractor-config";
import { ExtractorFormatPicker } from "./ExtractorFormatPicker";

type ExtractorConfig = (typeof EXTRACTORS)[number];

interface ExtractorCardProps {
  extractor: ExtractorConfig;
  isSelected: boolean;
  control: Control<CreateJobFormData>;
}

export function ExtractorCard({
  extractor,
  isSelected,
  control,
}: ExtractorCardProps) {
  const Icon = extractor.icon;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-150 space-y-3",
        isSelected
          ? "border-primary/30 bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-card"
      )}
    >
      <Label
        htmlFor={extractor.value}
        className="flex items-start gap-3 cursor-pointer"
      >
        <RadioGroupItem
          value={extractor.value}
          id={extractor.value}
          className="mt-0.5 shrink-0"
        />
        <div
          className={cn(
            "rounded-md p-1.5 shrink-0 transition-colors",
            isSelected
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{extractor.title}</span>
            {extractor.badge && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                {extractor.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed font-normal">
            {extractor.description}
          </p>
        </div>
      </Label>

      <div className="ml-10">
        <ExtractorFormatPicker
          control={control}
          formats={extractor.formats as OutputFormat[]}
          extractorValue={extractor.value}
          isActive={isSelected}
        />
      </div>
    </div>
  );
}
