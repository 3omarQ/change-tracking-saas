import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";
import { toast } from "sonner";

export function useNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notifyByEmail: boolean) =>
      usersService.updateNotificationSettings(notifyByEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Notification settings updated.");
    },
    onError: () => toast.error("Failed to update notification settings."),
  });
}