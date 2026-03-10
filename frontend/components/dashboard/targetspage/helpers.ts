import { TargetURL, JobStatus } from "@/types/dashboard.types";

export interface JobCounts {
  active: number;
  paused: number;
  total: number;
}

export function deriveJobCounts(datapoints: TargetURL["datapoints"]): JobCounts {
  const allJobs = datapoints.flatMap((d) => d.jobs);
  const active = allJobs.filter((j) => j.status === "ACTIVE").length;
  const paused = allJobs.filter((j) => j.status === "PAUSED").length;
  return { active, paused, total: active + paused };
}

export function jobsHref(url: string, status?: JobStatus): string {
  const search = encodeURIComponent(`"${url}"`);
  return status
    ? `/dashboard/jobs?search=${search}&status=${status}`
    : `/dashboard/jobs?search=${search}`;
}

export function datapointsHref(baseUrl:string , url: string): string {
  return `/dashboard/datapoints?search=${encodeURIComponent(url)}&target=${baseUrl}`;
}