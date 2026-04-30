import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";
import { toast } from "sonner";

export function useProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => usersService.getMe(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => usersService.updateProfile(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profile updated.");
    },
    onError: () => toast.error("Failed to update profile."),
  });
}