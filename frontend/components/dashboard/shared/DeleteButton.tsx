"use client";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "./ConfirmDialog";
import { useConfirmAction } from "@/hooks/useConfirmAction";

interface DeleteButtonProps {
  title: string;
  description: React.ReactNode;
  action: () => Promise<unknown>;
  successMessage?: string;
  errorMessage?: string;
  invalidateKeys?: string[][];
  redirectTo?: string;
  label?: string;
}

export function DeleteButton({
  title,
  description,
  action,
  successMessage,
  errorMessage,
  invalidateKeys,
  redirectTo,
  label,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const { execute, isLoading } = useConfirmAction({
    action,
    successMessage,
    errorMessage,
    invalidateKeys,
    redirectTo,
    onSuccess: () => setOpen(false),
  });

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
        onClick={() => setOpen(true)}
      >
        <Trash2Icon className="h-3.5 w-3.5" />
        {label ?? "Delete"}
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        confirmLabel="Delete"
        isLoading={isLoading}
        onConfirm={execute}
      />
    </>
  );
}