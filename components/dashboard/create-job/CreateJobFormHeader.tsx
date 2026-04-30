import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export function CreateJobFormHeader() {
  return (
    <div className="space-y-1">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link
          href="/dashboard/targets"
          className="hover:text-foreground transition-colors"
        >
          Targets
        </Link>
        <ChevronRightIcon className="h-3 w-3" />
        <span className="text-foreground font-medium">Build new job</span>
      </nav>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Build a new job
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your scraping job — define the target, schedule, and how
          results should be delivered.
        </p>
      </div>
    </div>
  );
}
