"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { FilterBar, SortOption } from "@/components/dashboard/shared/FilterBar";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { datapointColumns } from "@/components/dashboard/datapointspage/columns";
import { datapointService } from "@/services/datapoints.service";

export default function DatapointsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const { data: datapoints = [], isLoading } = useQuery({
    queryKey: ["datapoints"],
    queryFn: () => datapointService.getAll(),
  });

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
      />
      <DataTable
        columns={datapointColumns}
        data={datapoints}
        globalFilter={search}
        entityName="datapoint"
      />
    </div>
  );
}
