import apiClient from "@/lib/api-client";
import { ExecutionWithResults, ExecutionSummary } from "@/types/dashboard.types";

export const executionsService = {
  getOne: async (jobId: string, executionId: string): Promise<ExecutionWithResults> => {
    const { data } = await apiClient.get(`/jobs/${jobId}/executions/${executionId}`);
    return data;
  },

  getLatestDone: async (jobId: string): Promise<ExecutionWithResults[]> => {
    const { data } = await apiClient.get(`/jobs/${jobId}/executions/latest`);
    return data;
  },

  getAll: async (jobId: string): Promise<ExecutionSummary[]> => {
    const { data } = await apiClient.get(`/jobs/${jobId}/executions`);
    return data;
  },
};