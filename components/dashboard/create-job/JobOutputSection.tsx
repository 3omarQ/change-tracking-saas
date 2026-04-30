"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { RadioGroup } from "@/components/ui/radio-group";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { CreateJobSectionWrapper } from "./CreateJobSectionWrapper";
import { ExtractorType, EXTRACTORS } from "./extractor-config";
import { ExtractorCard } from "./ExtractorCard";
interface JobOutputSectionProps {
  form: UseFormReturn<CreateJobFormData>;
}

export function JobOutputSection({ form }: JobOutputSectionProps) {
  const { watch, setValue, control } = form;
  const extractorType = watch("extractorType");
  const outputFormat = watch("outputFormat");

  const handleExtractorChange = (value: string) => {
    setValue("extractorType", value as ExtractorType);
    if (value === "smart" && outputFormat === "txt") {
      setValue("outputFormat", "json");
    }
  };

  return (
    <CreateJobSectionWrapper
      step={4}
      title="Output configuration"
      description="Choose how extracted data should be processed and formatted."
    >
      <Controller
        control={control}
        name="extractorType"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={handleExtractorChange}
            className="space-y-3"
          >
            {EXTRACTORS.map((extractor) => (
              <ExtractorCard
                key={extractor.value}
                extractor={extractor}
                isSelected={extractorType === extractor.value}
                control={control}
              />
            ))}
          </RadioGroup>
        )}
      />
    </CreateJobSectionWrapper>
  );
}
