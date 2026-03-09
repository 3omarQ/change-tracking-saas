import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatCron(cron: string | null): string {
  if (!cron) return "—";
  const map: Record<string, string> = {
    "*/5 * * * *": "Every 5 minutes",
    "0 * * * *": "Every hour",
    "0 0 * * *": "Every day at midnight",
    "0 0 * * 0": "Every week on Sunday",
  };
  return map[cron] ?? cron;
}

export function formatDate(date: string | null, fallback = "Once"): string {
  if (!date) return fallback;
  return new Date(date).toLocaleString();
}
