import apiClient from "@/lib/api-client";
import { TargetURL } from "@/types/dashboard.types";

export const targetUrlService = {
  getAll: async (): Promise<TargetURL[]> => {
    const { data } = await apiClient.get("/target-urls");
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/target-urls/${id}`);
  },
};
