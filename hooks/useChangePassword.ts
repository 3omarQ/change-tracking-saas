import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      usersService.changePassword(currentPassword, newPassword),
    onSuccess: () => toast.success("Password changed successfully."),
    onError: () => toast.error("Failed to change password. Check your current password."),
  });
}