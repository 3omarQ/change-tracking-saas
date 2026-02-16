import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success("Registration successful! Please verify your email.");
      // Store email for verification page
      sessionStorage.setItem("verificationEmail", data.email);
      router.push("/verify-email");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
