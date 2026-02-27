"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DatabaseIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobDetailSection } from "./JobDetailSection";
import { JobDetailField } from "./JobDetailField";
import { EditSectionModal } from "./EditSectionModal";
import { Job } from "@/types/dashboard.types";
import apiClient from "@/lib/api-client";
import {
  CREATE_JOB_DEFAULTS,
  CreateJobFormData,
  createJobSchema,
} from "@/zod-schemas/createjob";
import { JobBasicsSection } from "../create-job/JobBasicsSection";

export function DatapointSection({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      ...CREATE_JOB_DEFAULTS,
      url: job.datapoint.targetUrl.url,
      name: job.datapoint.name,
      datapointPath: job.datapoint.path,
    },
  });

  const handleSubmit = async () => {
    const valid = await form.trigger(["url", "name", "datapointPath"]);
    if (!valid) return;
    const data = form.getValues();
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/datapoints/${job.datapoint.id}`, {
        name: data.name,
        path: data.datapointPath,
      });
      await apiClient.patch(`/target-urls/${job.datapoint.targetUrl.id}`, {
        url: data.url,
      });
      toast.success("Datapoint updated.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
      setOpen(false);
    } catch {
      toast.error("Failed to update datapoint.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <JobDetailSection
        icon={DatabaseIcon}
        label="Datapoint"
        onEdit={() => setOpen(true)}
      >
        <JobDetailField label="Name" value={job.datapoint.name} />
        <JobDetailField
          label="CSS / HTML path"
          value={
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono truncate max-w-sm block">
              {job.datapoint.path}
            </code>
          }
        />
      </JobDetailSection>

      <EditSectionModal
        title="Edit datapoint"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <JobBasicsSection form={form} />
      </EditSectionModal>
    </>
  );
}
