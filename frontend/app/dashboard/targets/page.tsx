"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  SortOption,
  TargetsFilterBar,
} from "@/components/dashboard/targetspage/TargetsFilterBar";
import { TargetsGrid } from "@/components/dashboard/targetspage/TargetsGrid";
import { TargetsPageHeader } from "@/components/dashboard/targetspage/TargetsPageHeader";
import { targetUrlService } from "@/services/targets.service";

export default function TargetsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const { data: targets = [], isLoading } = useQuery({
    queryKey: ["target-urls"],
    queryFn: () => targetUrlService.getAll(),
  });

  const totalJobs = targets.reduce(
    (acc, t) => acc + t.datapoints.flatMap((d) => d.jobs).length,
    0
  );
  const totalDatapoints = targets.reduce(
    (acc, t) => acc + t._count.datapoints,
    0
  );

  const filteredTargets = useMemo(() => {
    let result = [...targets];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) || t.url.toLowerCase().includes(q)
      );
    }
    if (sort === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [search, sort, targets]);

  if (isLoading)
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        Loading targets...
      </div>
    );

  return (
    <div className="space-y-6">
      <TargetsPageHeader
        totalJobs={totalJobs}
        totalDatapoints={totalDatapoints}
      />
      <TargetsFilterBar
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />
      <TargetsGrid targets={filteredTargets} />
    </div>
  );
}
