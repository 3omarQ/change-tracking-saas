import apiClient from "@/lib/api-client";
import { Job } from "@/types/dashboard.types";

export const jobService = {
  createTargetUrl: async (data: { url: string }) => {
    const res = await apiClient.post("/target-urls", data);
    return res.data;
  },
  findOrCreateTargetUrl: async (payload: { url: string }) => {
    const { data } = await apiClient.post(
      "/target-urls/find-or-create",
      payload
    );
    return data;
  },

  createDatapoint: async (data: {
    name: string;
    path: string;
    targetUrlId: string;
  }) => {
    const res = await apiClient.post("/datapoints", data);
    return res.data;
  },

  createJob: async (data: {
    datapointId: string;
    definition: string;
    cron?: string;
    scheduleStart?: string;
    extractorType: string;
    outputFormat: string;
    notifyOnFinish: boolean;
    notifyOnDiff: boolean;
    notifyOnFail: boolean;
  }) => {
    const res = await apiClient.post("/jobs", data);
    return res.data;
  },

  getAll: async (): Promise<Job[]> => {
    const { data } = await apiClient.get("/jobs");
    return data;
  },
};
