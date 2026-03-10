"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { FilterBar, SortOption, FilterOption } from "@/components/dashboard/shared/FilterBar";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { datapointColumns } from "@/components/dashboard/datapointspage/columns";
import { datapointService } from "@/services/datapoints.service";

export default function DatapointsPage() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sort, setSort] = useState<SortOption>("latest");
  const [targetValue, setTargetValue] = useState<FilterOption | null>(() => {
    const t = searchParams.get("target");
    return t ? { id: t, label: t } : null;
  });

  const { data: datapoints = [], isLoading } = useQuery({
    queryKey: ["datapoints"],
    queryFn: () => datapointService.getAll(),
  });

  const targetOptions = useMemo<FilterOption[]>(() => {
    const seen = new Set<string>();
    return datapoints
      .filter((d) => {
        const key = d.targetUrl.baseUrl ?? d.targetUrl.url;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((d) => ({
        id: d.targetUrl.baseUrl ?? d.targetUrl.url,
        label: d.targetUrl.baseUrl ?? d.targetUrl.url,
      }));
  }, [datapoints]);

  const filtered = useMemo(() => {
    if (!targetValue) return datapoints;
    return datapoints.filter(
      (d) => (d.targetUrl.baseUrl ?? d.targetUrl.url) === targetValue.id
    );
  }, [datapoints, targetValue]);

  if (isLoading)
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        Loading datapoints...
      </div>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Datapoints"
        stats={[{ label: "datapoints", value: datapoints.length }]}
        actionLabel="Build new job"
        actionHref="/dashboard/jobs/create-job"
      />
      <FilterBar
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
        searchPlaceholder="Search datapoints..."
        targetOptions={targetOptions}
        targetValue={targetValue}
        onTargetChange={setTargetValue}
      />
      <DataTable
        columns={datapointColumns}
        data={filtered}
        globalFilter={search}
        entityName="datapoint"
      />
    </div>
  );
}