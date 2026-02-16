import {
  MutationObserverErrorResult,
  useMutation,
} from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginFormData } from "@/zod-schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your toast library
import { ApiError } from "next/dist/server/api-utils";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
};
