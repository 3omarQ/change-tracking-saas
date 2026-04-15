"use client";
import { useRouter } from "next/navigation";
import { MoreHorizontalIcon, ArrowRightIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { datapointService } from "@/services/datapoints.service";
import { Datapoint } from "@/types/dashboard.types";
import { useState } from "react";
import { useConfirmAction } from "@/hooks/useConfirmAction";

function DeleteDescription({ name }: { name: string }) {
  return (
    <>
      <p>
        This will permanently delete{" "}
        <span className="font-medium text-foreground">&quot;{name}&quot;</span> and all related data:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-0.5">
        <li>All jobs and their executions</li>
        <li>All scraped results and logs</li>
        <li>All scheduled runs will be cancelled</li>
      </ul>
      <p className="mt-2 font-medium text-foreground">This cannot be undone.</p>
    </>
  );
}

export default function DatapointActions({ datapoint }: { datapoint: Datapoint }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { execute: deleteDatapoint, isLoading: isDeleting } = useConfirmAction({
    action: () => datapointService.remove(datapoint.id),
    invalidateKeys: [["datapoints"]],
    redirectTo: "/dashboard/datapoints",
    successMessage: "Datapoint deleted.",
    errorMessage: "Failed to delete datapoint.",
    onSuccess: () => setDialogOpen(false),
  });

  return (
    // Stop propagation so opening the menu doesn't trigger the row click
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="gap-2"
            onClick={() => router.push(`/dashboard/datapoints/${datapoint.id}`)}
          >
            <EyeIcon className="h-3.5 w-3.5" />
            View details
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onClick={() =>
              router.push(`/dashboard/jobs?search=${encodeURIComponent(`"${datapoint.name}"`)}`)
            }
          >
            <ArrowRightIcon className="h-3.5 w-3.5" />
            View jobs
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
        title="Delete datapoint?"
        description={<DeleteDescription name={datapoint.name} />}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={deleteDatapoint}
      />
    </div>
  );
}