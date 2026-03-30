"use client";
import { useState } from "react";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { TargetURL } from "@/types/dashboard.types";
import { useConfirmAction } from "@/hooks/useConfirmAction";
import { targetUrlService } from "@/services/targets.service";

function DeleteDescription({ target }: { target: TargetURL }) {
  const totalJobs = target.datapoints.flatMap((d) => d.jobs).length;
  return (
    <>
      <p>
        This will permanently delete{" "}
        <span className="font-medium text-foreground">&quot;{target.name}&quot;</span> and all related data:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-0.5">
        <li>{target._count.datapoints} datapoints</li>
        <li>{totalJobs} jobs and all their executions</li>
        <li>All scraped results and logs</li>
        <li>All scheduled runs will be cancelled</li>
      </ul>
      <p className="mt-2 font-medium text-foreground">This cannot be undone.</p>
    </>
  );
}

export function TargetCardActions({ target }: { target: TargetURL }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { execute: deleteTarget, isLoading: isDeleting } = useConfirmAction({
    action: () => targetUrlService.remove(target.id),
    invalidateKeys: [["target-urls"]],
    successMessage: "Target deleted.",
    errorMessage: "Failed to delete target.",
    onSuccess: () => setDialogOpen(false),
  });

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
            onClick={() => setTimeout(() => setDialogOpen(true), 0)}
          >
            <Trash2Icon className="h-3.5 w-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setTimeout(() => { document.body.style.pointerEvents = ""; }, 0);
        }}
        title="Delete target?"
        description={<DeleteDescription target={target} />}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={deleteTarget}
      />
    </>
  );
}