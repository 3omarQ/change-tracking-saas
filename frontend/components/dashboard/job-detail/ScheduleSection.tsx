"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { JobDetailSection } from "./JobDetailSection";
import { JobDetailField } from "./JobDetailField";
import { EditSectionModal } from "./EditSectionModal";
import { JobScheduleSection } from "@/components/dashboard/create-job/JobScheduleSection";
import { Job } from "@/types/dashboard.types";
import {
  createJobSchema,
  CreateJobFormData,
  CREATE_JOB_DEFAULTS,
} from "@/zod-schemas/createjob";
import apiClient from "@/lib/api-client";
import { formatCron, formatDate } from "@/lib/utils";

const CRON_MAP: Record<string, string> = {
  hourly: "0 * * * *",
  daily: "0 0 * * *",
  weekly: "0 0 * * 0",
};

export function ScheduleSection({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      ...CREATE_JOB_DEFAULTS,
      scheduleType: job.cron ? "schedule" : "once",
      scheduleStart: job.scheduleStart ? "custom" : "now",
      scheduleStartDate: job.scheduleStart
        ? new Date(job.scheduleStart).toISOString().slice(0, 16)
        : undefined,
      scheduleInterval: job.cron
        ? (Object.entries(CRON_MAP).find(([, v]) => v === job.cron)?.[0] as
          | "hourly"
          | "daily"
          | "weekly") ?? "daily"
        : "daily",
    },
  });

  const handleSubmit = async () => {
    const data = form.getValues();
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/jobs/${job.id}`, {
        cron:
          data.scheduleType === "schedule" && data.scheduleInterval
            ? CRON_MAP[data.scheduleInterval]
            : null,
        scheduleStart:
          data.scheduleStart === "custom" && data.scheduleStartDate
            ? new Date(data.scheduleStartDate).toISOString()
            : data.scheduleStart === "now"
              ? new Date().toISOString()
              : undefined,
      });
      toast.success("Schedule updated.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
      setOpen(false);
    } catch {
      toast.error("Failed to update schedule.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <JobDetailSection
        icon={CalendarIcon}
        label="Schedule"
        onEdit={() => setOpen(true)}
      >

        <JobDetailField label="Recurrence" value={formatCron(job.cron)} />
        <JobDetailField label="Started at" value={formatDate(job.createdAt)} />
      </JobDetailSection>

      <EditSectionModal
        title="Edit schedule"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <JobScheduleSection form={form} />
      </EditSectionModal>
    </>
  );
}
