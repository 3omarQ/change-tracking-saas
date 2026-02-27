"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BellIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { JobDetailSection } from "./JobDetailSection";
import { JobDetailField } from "./JobDetailField";
import { EditSectionModal } from "./EditSectionModal";
import { JobNotificationSection } from "@/components/dashboard/create-job/JobNotifymeSection";
import { Job } from "@/types/dashboard.types";
import {
  createJobSchema,
  CreateJobFormData,
  CREATE_JOB_DEFAULTS,
} from "@/zod-schemas/createjob";
import apiClient from "@/lib/api-client";

export function NotificationsSection({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      ...CREATE_JOB_DEFAULTS,
      notifyOnFinish: job.notifyOnFinish,
      notifyOnDiff: job.notifyOnDiff,
      notifyOnFail: job.notifyOnFail,
    },
  });

  const handleSubmit = async () => {
    const data = form.getValues();
    setIsSubmitting(true);
    try {
      await apiClient.patch(`/jobs/${job.id}`, {
        notifyOnFinish: data.notifyOnFinish,
        notifyOnDiff: data.notifyOnDiff,
        notifyOnFail: data.notifyOnFail,
      });
      toast.success("Notifications updated.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
      setOpen(false);
    } catch {
      toast.error("Failed to update notifications.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function NotificationValue({ enabled }: { enabled: boolean }) {
    return enabled ? (
      <span className="flex items-center gap-1.5 text-emerald-600 text-sm">
        <CheckCircleIcon className="h-3.5 w-3.5" /> Enabled
      </span>
    ) : (
      <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
        <XCircleIcon className="h-3.5 w-3.5" /> Disabled
      </span>
    );
  }

  return (
    <>
      <JobDetailSection
        icon={BellIcon}
        label="Notifications"
        onEdit={() => setOpen(true)}
      >
        <JobDetailField
          label="Notify on finish"
          value={<NotificationValue enabled={job.notifyOnFinish} />}
        />
        <JobDetailField
          label="Notify on diff"
          value={<NotificationValue enabled={job.notifyOnDiff} />}
        />
        <JobDetailField
          label="Notify on fail"
          value={<NotificationValue enabled={job.notifyOnFail} />}
        />
      </JobDetailSection>

      <EditSectionModal
        title="Edit notifications"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <JobNotificationSection form={form} />
      </EditSectionModal>
    </>
  );
}
