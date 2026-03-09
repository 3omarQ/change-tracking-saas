import { CRON_INTERVALS } from "@/lib/cron";
import { z } from "zod";

export const createJobSchema = z.object({
  // Section 1 - Basics
  name: z.string().min(1, "Datapoint name is required"),
  url: z.string().url("Must be a valid URL"),
  datapointPath: z.string().min(1, "CSS/HTML path is required"),

  // Section 2 - Schedule
  scheduleType: z.enum(["once", "schedule"]),
  scheduleInterval: z.enum(CRON_INTERVALS).optional(),
  scheduleStart: z.enum(["now", "custom"]).optional(),
  scheduleStartDate: z.string().optional(),

  // Section 3 - Notifications
  notifyOnFinish: z.boolean(),
  notifyOnDiff: z.boolean(),
  notifyOnFail: z.boolean(),

  // Section 4 - Output
  extractorType: z.enum(["smart", "basic"]),
  outputFormat: z.enum(["json", "md", "txt"]),
});

export type CreateJobFormData = z.infer<typeof createJobSchema>;

export const CREATE_JOB_DEFAULTS: CreateJobFormData = {
  name: "",
  url: "",
  datapointPath: "",
  scheduleType: "once",
  scheduleInterval: "daily",
  scheduleStart: "now",
  scheduleStartDate: undefined,
  notifyOnFinish: true,
  notifyOnDiff: true,
  notifyOnFail: true,
  extractorType: "smart",
  outputFormat: "json",
};
