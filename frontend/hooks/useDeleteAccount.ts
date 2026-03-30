import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useDeleteAccount() {
  const router = useRouter();
  return useMutation({
    mutationFn: () => usersService.deleteAccount(),
    onSuccess: () => {
      toast.success("Account deleted.");
      router.push("/auth/login");
    },
    onError: () => toast.error("Failed to delete account."),
  });
}