"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { FilterBar, SortOption } from "@/components/dashboard/shared/FilterBar";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { jobColumns } from "@/components/dashboard/jobspage/columns";
import { jobService } from "@/services/jobs.service";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobService.getAll(),
  });

  if (isLoading)
    return (
      <div className="py-24 text-center text-sm text-muted-foreground">
        Loading jobs...
      </div>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        stats={[{ label: "jobs", value: jobs.length }]}
        actionLabel="Build new job"
        actionHref="/dashboard/jobs/create-job"
      />
      <FilterBar
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
        searchPlaceholder="Search jobs..."
      />
      <DataTable
        columns={jobColumns}
        data={jobs}
        globalFilter={search}
        entityName="job"
      />
    </div>
  );
}
