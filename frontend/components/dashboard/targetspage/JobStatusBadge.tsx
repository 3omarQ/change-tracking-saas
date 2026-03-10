import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface JobStatusBadgeProps {
  count: number;
  status: "active" | "paused";
  href: string;
}

export function JobStatusBadge({ count, status, href }: JobStatusBadgeProps) {
  const isActive = status === "active";
  return (
    <Link href={href}>
      <Badge
        variant="outline"
        className={
          isActive
            ? "text-xs gap-1 border-emerald-200 text-emerald-700 bg-emerald-50 cursor-pointer hover:bg-emerald-100 transition-colors"
            : "text-xs gap-1 border-amber-200 text-amber-700 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
        }
      >
        <span
          className={`h-1.5 w-1.5 rounded-full inline-block ${isActive ? "bg-emerald-400" : "bg-amber-400"
            }`}
        />
        {count} {status}
      </Badge>
    </Link>
  );
}