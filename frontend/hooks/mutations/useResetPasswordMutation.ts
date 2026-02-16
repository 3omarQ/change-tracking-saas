import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });
};
