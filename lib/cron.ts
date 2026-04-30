export const CRON_MAP: Record<string, string> = {
  every5min: "*/5 * * * *",
  hourly: "0 * * * *",
  daily: "0 0 * * *",
  weekly: "0 0 * * 0",
};

export const CRON_LABELS: Record<string, string> = {
  "*/5 * * * *": "Every 5 minutes",
  "0 * * * *": "Every hour",
  "0 0 * * *": "Every day at midnight",
  "0 0 * * 0": "Every week on Sunday",
};

export function formatCron(cron: string | null): string {
  if (!cron) return "Once";
  return CRON_LABELS[cron] ?? cron;
}

export function cronToInterval(cron: string): string {
  return Object.entries(CRON_MAP).find(([, v]) => v === cron)?.[0] ?? "daily";
}

export const CRON_INTERVALS = Object.keys(CRON_MAP) as [string, ...string[]];