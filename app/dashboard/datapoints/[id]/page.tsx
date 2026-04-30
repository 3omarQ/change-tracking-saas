"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { datapointService } from "@/services/datapoints.service";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { DeleteButton } from "@/components/dashboard/shared/DeleteButton";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DatapointPreview } from "@/components/dashboard/datapoint-detail/DatapointPreview";
import { DatapointInfoSection } from "@/components/dashboard/datapoint-detail/DatapointInfoSection";

export default function DatapointDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: datapoint, isLoading } = useQuery({
    queryKey: ["datapoint", id],
    queryFn: () => datapointService.getById(id),
  });

  if (isLoading)
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        Loading datapoint...
      </div>
    );

  if (!datapoint) return null;

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title={datapoint.name}
        showBackButton
        meta={
          <span className="text-xs text-muted-foreground">
            {datapoint.targetUrl.name}
          </span>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() =>
                router.push(
                  `/dashboard/jobs?search=${encodeURIComponent(`"${datapoint.name}"`)}`
                )
              }
            >
              <ArrowRightIcon className="h-3.5 w-3.5" />
              View jobs
            </Button>
            <DeleteButton
              title="Delete datapoint?"
              description={
                <>
                  <p>This will permanently delete <span className="font-medium text-foreground">&quot;{datapoint.name}&quot;</span> and all related data:</p>
                  <ul className="list-disc list-inside mt-2 space-y-0.5">
                    <li>All jobs and their executions</li>
                    <li>All scraped results and logs</li>
                    <li>All scheduled runs will be cancelled</li>
                  </ul>
                  <p className="mt-2 font-medium text-foreground">This cannot be undone.</p>
                </>
              }
              action={() => datapointService.remove(datapoint.id)}
              redirectTo="/dashboard/datapoints"
              successMessage="Datapoint deleted."
              errorMessage="Failed to delete datapoint."
              invalidateKeys={[["datapoints"]]}
            />
          </>
        }
      />

      <DatapointInfoSection datapoint={datapoint} />
      <DatapointPreview
        url={datapoint.targetUrl.url}
        selector={datapoint.path}
      />
    </div>
  );
}