import { TargetCard } from "./TargetCard";
import { TargetURL } from "@/types/dashboard.types";

interface TargetsGridProps {
  targets: TargetURL[];
}

export function TargetsGrid({ targets }: TargetsGridProps) {
  if (targets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground text-sm">No targets found.</p>
        <p className="text-muted-foreground text-xs mt-1">
          Try adjusting your search or build a new job.
        </p>
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
