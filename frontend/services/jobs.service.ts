import apiClient from "@/lib/api-client";
import { Job } from "@/types/dashboard.types";

export const jobService = {
  getById: async (id: string): Promise<Job> => {
    const { data } = await apiClient.get(`/jobs/${id}`);
    return data;
  },

  findOrCreateTargetUrl: async (payload: { url: string }) => {
    const { data } = await apiClient.post("/target-urls/find-or-create", payload);
    return data;
  },

  createDatapoint: async (data: {
    name: string;
    path: string;
    fieldNames?: string[];
    paginationSelector?: string;
    maxPages?: number;
    targetUrlId: string;
  }) => {
    const { data: res } = await apiClient.post("/datapoints", data);
    return res;
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
    const { data: res } = await apiClient.post("/jobs", data);
    return res;
  },

  getAll: async (): Promise<Job[]> => {
    const { data } = await apiClient.get("/jobs");
    return data;
  },
  remove: async (id: string) => {
    const { data } = await apiClient.delete(`/jobs/${id}`);
    return data;
  },
};