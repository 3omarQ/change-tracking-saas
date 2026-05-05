import { TargetCard } from "./TargetCard";
import { TargetURL } from "@/types/dashboard.types";
import { Button } from "@/components/ui/button";
import { CreateJobButton } from "@/components/dashboard/shared/CreateJobButton";

interface TargetsGridProps {
  targets: TargetURL[];
  totalTargets: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function TargetsGrid({
  targets,
  totalTargets,
  hasActiveFilters,
  onClearFilters,
}: TargetsGridProps) {
  if (targets.length === 0) {
    const isFiltered = totalTargets > 0 && hasActiveFilters;

    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-md border border-dashed border-border py-16 text-center">
        <div className="space-y-1">
          <p className="font-medium text-foreground">
            {isFiltered ? "No targets match your search." : "No targets yet."}
          </p>
          <p className="mx-auto max-w-sm text-sm leading-5 text-muted-foreground">
            {isFiltered
              ? "Clear your search to get back to your saved targets."
              : "Build your first job to start tracking a target page and its datapoints."}
          </p>
        </div>
        {isFiltered ? (
          <Button type="button" variant="outline" size="sm" onClick={onClearFilters}>
            Clear search
          </Button>
        ) : (
          <CreateJobButton />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {targets.map((target) => (
        <TargetCard key={target.id} target={target} />
      ))}
    </div>
  );
}
