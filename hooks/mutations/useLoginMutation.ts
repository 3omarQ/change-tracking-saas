"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { AxiosError } from "axios";
import { ApiError } from "@/types/auth.types";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.message || "Invalid email or password");
    },
  });
};
