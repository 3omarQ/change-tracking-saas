"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StatItem {
  label: string;
  value: number;
}

interface PageHeaderProps {
  title: string;

  // detail page props
  showBackButton?: boolean;
  meta?: React.ReactNode;

  // list page props
  stats?: StatItem[];
  actionLabel?: string;
  actionHref?: string;

  // shared
  actions?: React.ReactNode;
}

function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const parentPath = pathname.split("/").slice(0, -1).join("/");
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent shrink-0"
      onClick={() => router.push(parentPath)}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
  );
}

function Stats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="flex items-center gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{stat.value}</span>{" "}
          {stat.label}
        </div>
      ))}
    </div>
  );
}

export function PageHeader({
  title,
  showBackButton,
  meta,
  stats,
  actionLabel,
  actionHref,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      {showBackButton && <BackButton />}

      <div className="flex flex-col flex-1 gap-0.5">
        <span className="font-semibold tracking-tight text-xl text-foreground">
          {title}
        </span>
        {meta && (
          <div className="flex items-center gap-2 flex-wrap">{meta}</div>
        )}
        {stats && <Stats stats={stats} />}
      </div>

      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="sm" className="gap-1.5">
            <PlusIcon className="h-3.5 w-3.5" />
            {actionLabel}
          </Button>
        </Link>
      )}

      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}