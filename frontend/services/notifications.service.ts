import apiClient from "@/lib/api-client";
import { Notification } from "@/types/dashboard.types";

export const notificationsService = {
  getAll: async (): Promise<Notification[]> => {
    const { data } = await apiClient.get("/notifications");
    return data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const { data } = await apiClient.patch(`/notifications/${id}/read`);
    return data;
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch("/notifications/read-all");
  },
};