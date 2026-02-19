"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Targets", href: "/dashboard/targets" },
  { label: "Datapoints", href: "/dashboard/datapoints" },
  { label: "Jobs", href: "/dashboard/jobs" },
  { label: "Credits", href: "/dashboard/credits" },
];

export function TopBarNavigationTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
