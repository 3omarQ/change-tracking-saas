import { Badge } from "@/components/ui/badge";
import { TargetURL } from "@/types/dashboard.types";

export function TargetStatusBadge({ status }: { status: TargetURL["status"] }) {
    const isActive = status === "ACTIVE";
    return (
        <Badge
            variant="outline"
            className={
                isActive
                    ? "text-xs border-emerald-200 text-emerald-700 bg-emerald-50"
                    : "text-xs border-red-200 text-red-700 bg-red-50"
            }
        >
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}