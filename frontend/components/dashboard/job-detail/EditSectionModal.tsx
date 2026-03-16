"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
interface EditSectionModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  children: React.ReactNode;
}

export function EditSectionModal({
  title,
  open,
  onClose,
  onSubmit,
  isSubmitting,
  children,
}: EditSectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        </VisuallyHidden.Root>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} className="gap-2">
            {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
