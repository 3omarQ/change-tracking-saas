import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "@/services/notifications.service";
import { Notification } from "@/types/dashboard.types";

const NOTIFICATION_QUERY_KEY = ["notifications"];

export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: notificationsService.getAll,
  });
}

export function useUnreadCount() {
  const { data: notifications = [] } = useNotifications();
  return notifications.filter((n) => !n.read).length;
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAsRead,
    onSuccess: (updated) => {
      queryClient.setQueryData<Notification[]>(
        NOTIFICATION_QUERY_KEY,
        (prev) => prev?.map((n) => (n.id === updated.id ? updated : n)) ?? []
      );
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: () => {
      queryClient.setQueryData<Notification[]>(
        NOTIFICATION_QUERY_KEY,
        (prev) => prev?.map((n) => ({ ...n, read: true })) ?? []
      );
    },
  });
}