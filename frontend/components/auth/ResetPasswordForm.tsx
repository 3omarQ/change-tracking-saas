"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/zod-schemas/auth";
import { useResetPasswordMutation } from "@/hooks/mutations/useResetPasswordMutation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = ({ confirmPassword, ...data }: ResetPasswordFormData) => {
    resetPassword({ ...data, token });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
