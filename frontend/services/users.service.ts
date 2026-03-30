import apiClient from "@/lib/api-client";
import { User } from "@/types/dashboard.types";

export const usersService = {
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get("/users/me");
    return data;
  },
  updateProfile: async (name: string): Promise<User> => {
    const { data } = await apiClient.patch("/users/me", { name });
    return data;
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await apiClient.patch("/users/me/password", {
      currentPassword,
      newPassword,
    });
    return data;
  },
  updateNotificationSettings: async (notifyByEmail: boolean): Promise<User> => {
    const { data } = await apiClient.patch("/users/me/notifications", {
      notifyByEmail,
    });
    return data;
  },
  deleteAccount: async () => {
    await apiClient.delete("/users/me");
  },
};