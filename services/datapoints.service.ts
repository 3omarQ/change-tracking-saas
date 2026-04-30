import apiClient from "@/lib/api-client";
import { Datapoint } from "@/types/dashboard.types";

export const datapointService = {
  getAll: async (): Promise<Datapoint[]> => {
    const { data } = await apiClient.get("/datapoints");
    return data;
  },
  remove: async (id: string) => {
    const { data } = await apiClient.delete(`/datapoints/${id}`);
    return data;
  },
  getById: async (id: string): Promise<Datapoint> => {
    const { data } = await apiClient.get(`/datapoints/${id}`);
    return data;
  },
};
