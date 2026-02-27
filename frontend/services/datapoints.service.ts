import apiClient from "@/lib/api-client";
import { Datapoint } from "@/types/dashboard.types";

export const datapointService = {
  getAll: async (): Promise<Datapoint[]> => {
    const { data } = await apiClient.get("/datapoints");
    return data;
  },
};
