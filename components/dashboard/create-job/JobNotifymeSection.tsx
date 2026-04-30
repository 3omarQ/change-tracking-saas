"use client";

import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { CreateJobFormData } from "@/zod-schemas/createjob";
import { CreateJobSectionWrapper } from "./CreateJobSectionWrapper";

interface JobNotificationSectionProps {
  form: UseFormReturn<CreateJobFormData>;
}

interface NotificationTrigger {
  id: string;
  label: string;
  description: string;
}

const TRIGGERS: NotificationTrigger[] = [
  {
    id: "job_finished",
    label: "Job finishes",
    description: "Notify me every time this job completes a run.",
  },
  {
    id: "job_failed",
    label: "Job failed",
    description:
      "Notify me immediately if the job errors out or the script fails to execute.",
  },
  {
    id: "result_diff",
    label: "Result differs from last",
    description:
      "Notify me only when the extracted data has changed since the previous run.",
  },
];

function TriggerRow({
  trigger,
  checked,
  onToggle,
}: {
  trigger: NotificationTrigger;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full flex items-start gap-3 rounded-lg border p-4 text-left transition-all duration-150",
        checked
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:bg-muted/30"
      )}
    >
      <div
        className={cn(
          "mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-150",
          checked
            ? "border-primary bg-primary"
            : "border-muted-foreground/40 bg-transparent"
        )}
      >
        {checked && (
          <CheckIcon className="h-2.5 w-2.5 text-primary-foreground" />
        )}
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            checked ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {trigger.label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {trigger.description}
        </p>
      </div>
    </button>
  );
}

export function JobNotificationSection({ form }: JobNotificationSectionProps) {
  const notifyOnFinish = form.watch("notifyOnFinish");
  const notifyOnDiff = form.watch("notifyOnDiff");
  const notifyOnFail = form.watch("notifyOnFail");

  const checkedMap: Record<string, boolean> = {
    job_finished: notifyOnFinish,
    job_failed: notifyOnFail,
    result_diff: notifyOnDiff,
  };

  const toggleMap: Record<string, () => void> = {
    job_finished: () => form.setValue("notifyOnFinish", !notifyOnFinish),
    job_failed: () => form.setValue("notifyOnFail", !notifyOnFail),
    result_diff: () => form.setValue("notifyOnDiff", !notifyOnDiff),
  };

  return (
    <CreateJobSectionWrapper
      step={3}
      title="Notify me when"
      description="Choose which events should trigger a notification. Notification channels can be configured in account settings."
    >
      <div className="space-y-2">
        {TRIGGERS.map((trigger) => (
          <TriggerRow
            key={trigger.id}
            trigger={trigger}
            checked={checkedMap[trigger.id]}
            onToggle={toggleMap[trigger.id]}
          />
        ))}
      </div>
    </CreateJobSectionWrapper>
  );
}
