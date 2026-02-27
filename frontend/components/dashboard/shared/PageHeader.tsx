import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface StatItem {
  label: string;
  value: number;
}

interface PageHeaderProps {
  title: string;
  stats: StatItem[];
  actionLabel?: string;
  actionHref?: string;
}

export function PageHeader({
  title,
  stats,
  actionLabel,
  actionHref,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {stats.map((stat, i) => (
            <span key={stat.label} className="flex items-center gap-1">
              {i > 0 && <span className="text-border mr-2">·</span>}
              <span className="font-medium text-foreground">{stat.value}</span>
              {stat.label}
            </span>
          ))}
        </div>
      </div>
      {actionLabel && actionHref && (
        <Button className="gap-2" onClick={() => router.push(actionHref)}>
          <PlusIcon className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
