"use client";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/mutations/useLogoutMutation";
import { Loader2Icon, LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function LogoutButton({
  variant = "outline",
  size = "default",
  showIcon = true,
  children = "Sign out",
  className,
}: LogoutButtonProps) {
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => logout()}
      disabled={isPending}
      className={className}
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {showIcon && <LogOut className="mr-2 h-4 w-4" />}
          {children}
        </>
      )}
    </Button>
  );
}
