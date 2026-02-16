import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      sessionStorage.removeItem("verificationEmail");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });
};
