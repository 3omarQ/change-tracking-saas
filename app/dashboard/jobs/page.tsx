"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { FilterBar, SortOption } from "@/components/dashboard/shared/FilterBar";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { jobColumns } from "@/components/dashboard/jobspage/columns";
import { jobService } from "@/services/jobs.service";
import { JobStatus } from "@/types/dashboard.types";

export default function JobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") as JobStatus | null;

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sort, setSort] = useState<SortOption>("latest");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobService.getAll(),
  });

  const clearStatus = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    router.push(`/dashboard/jobs?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    if (!statusParam) return jobs;
    return jobs.filter((j) => j.status === statusParam);
  }, [jobs, statusParam]);

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
        searchPlaceholder='Search jobs...'
        activeStatus={statusParam}
        onStatusClear={clearStatus}
      />
      <DataTable
        columns={jobColumns}
        data={filtered}
        globalFilter={search}
        entityName="job"
        onRowClick={(job) => router.push(`/dashboard/jobs/${job.id}`)}
      />
    </div>
  );
}