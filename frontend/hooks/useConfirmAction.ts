import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface UseConfirmActionOptions {
  action: () => Promise<unknown>;
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
  invalidateKeys?: string[][];
  redirectTo?: string;
}

export function useConfirmAction({
  action,
  onSuccess,
  successMessage = "Done.",
  errorMessage = "Something went wrong.",
  invalidateKeys,
  redirectTo,
}: UseConfirmActionOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const execute = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await action();
      if (invalidateKeys) {
        await Promise.all(
          invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
        );
      }
      toast.success(successMessage);
      onSuccess?.();
      if (redirectTo) router.push(redirectTo);
    } catch {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading };
}