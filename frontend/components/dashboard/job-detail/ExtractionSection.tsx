"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CodeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobDetailSection } from "./JobDetailSection";
import { JobDetailField } from "./JobDetailField";
import { EditSectionModal } from "./EditSectionModal";
import { JobOutputSection } from "@/components/dashboard/create-job/JobOutputSection";
import { Job } from "@/types/dashboard.types";
import {
  createJobSchema,
  CreateJobFormData,
  CREATE_JOB_DEFAULTS,
} from "@/zod-schemas/createjob";
import apiClient from "@/lib/api-client";

export function ExtractionSection({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      ...CREATE_JOB_DEFAULTS,
      extractorType: job.extractorType.toLowerCase() as "smart" | "basic",
      outputFormat: job.outputFormat.toLowerCase() as "json" | "md" | "txt",
    },
  });

  const handleSubmit = async () => {
    const data = form.getValues();
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/jobs/${job.id}`, {
        extractorType: data.extractorType,
        outputFormat: data.outputFormat,
      });
      toast.success("Extraction settings updated.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
      setOpen(false);
    } catch {
      toast.error("Failed to update extraction settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <JobDetailSection
        icon={CodeIcon}
        label="Extraction"
        onEdit={() => setOpen(true)}
      >
        <JobDetailField
          label="Extractor type"
          value={
            <Badge variant="secondary" className="text-xs">
              {job.extractorType}
            </Badge>
          }
        />
        <JobDetailField
          label="Output format"
          value={
            <Badge variant="secondary" className="text-xs">
              {job.outputFormat}
            </Badge>
          }
        />
      </JobDetailSection>

      <EditSectionModal
        title="Edit extraction"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <JobOutputSection form={form} />
      </EditSectionModal>
    </>
  );
}
