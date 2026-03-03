"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/dashboard.types";
import apiClient from "@/lib/api-client";
import { JobStatusToggleModal } from "./JobStatusToggleModal";

interface JobStatusToggleProps {
  job: Job;
}

export function JobStatusToggle({ job }: JobStatusToggleProps) {
  const [open, setOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const queryClient = useQueryClient();
  const isPaused = job.status === "PAUSED";

  const handleConfirm = async () => {
    setIsToggling(true);
    try {
      await apiClient.patch(`/jobs/${job.id}`, {
        status: isPaused ? "ACTIVE" : "PAUSED",
      });
      toast.success(isPaused ? "Job resumed." : "Job paused.");
      queryClient.invalidateQueries({ queryKey: ["job", job.id] });
      setOpen(false);
    } catch {
      toast.error("Failed to update job status.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() => setOpen(true)}
      >
        {isPaused ? (
          <PlayIcon className="h-3.5 w-3.5" />
        ) : (
          <PauseIcon className="h-3.5 w-3.5" />
        )}
        {isPaused ? "Resume" : "Pause"}
      </Button>

      <JobStatusToggleModal
        open={open}
        isPaused={isPaused}
        isLoading={isToggling}
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
