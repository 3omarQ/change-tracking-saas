import { Control, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { OutputFormat, FORMAT_LABELS } from "./extractor-config";

interface ExtractorFormatPickerProps {
  control: Control<CreateJobFormData>;
  formats: OutputFormat[];
  extractorValue: string;
  isActive: boolean;
}

export function ExtractorFormatPicker({
  control,
  formats,
  extractorValue,
  isActive,
}: ExtractorFormatPickerProps) {
  return (
    <Controller
      control={control}
      name="outputFormat"
      render={({ field }) => (
        <RadioGroup
          value={isActive ? field.value : ""} // ← only show selection on active card
          onValueChange={(v) => isActive && field.onChange(v as OutputFormat)}
          disabled={!isActive}
          className="flex items-center gap-4"
        >
          {formats.map((fmt) => (
            <div key={fmt} className="flex items-center gap-1.5">
              <RadioGroupItem
                value={fmt}
                id={`${extractorValue}-${fmt}`}
                disabled={!isActive}
                className="h-3.5 w-3.5"
              />
              <Label
                htmlFor={`${extractorValue}-${fmt}`}
                className={cn(
                  "text-xs font-normal transition-colors",
                  isActive
                    ? "text-muted-foreground cursor-pointer"
                    : "text-muted-foreground/40 cursor-not-allowed"
                )}
              >
                {FORMAT_LABELS[fmt]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
