import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  PauseIcon,
  PlayIcon,
  TriangleAlertIcon,
} from "lucide-react";

interface JobStatusToggleModalProps {
  open: boolean;
  isPaused: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function JobStatusToggleModal({
  open,
  isPaused,
  isLoading,
  onConfirm,
  onClose,
}: JobStatusToggleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-secondary p-2">
              {isPaused ? (
                <PlayIcon className="h-4 w-4 text-primary" />
              ) : (
                <PauseIcon className="h-4 w-4 text-primary" />
              )}
            </div>
            <DialogTitle>
              {isPaused ? "Resume this job?" : "Pause this job?"}
            </DialogTitle>
          </div>
          <DialogDescription className="pt-1">
            {isPaused ? (
              "The job will be re-activated and will run according to its schedule."
            ) : (
              <span className="flex flex-col gap-2">
                <span>Are you sure you want to pause this job?</span>
                <span className="flex items-start gap-1.5 text-primary bg-accent border border-border rounded-md px-3 py-2 text-xs">
                  <TriangleAlertIcon className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  All pending executions will be aborted immediately.
                </span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} className="gap-2">
            {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {isPaused ? "Resume job" : "Pause job"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
