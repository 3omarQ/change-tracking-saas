"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema, VerifyEmailFormData } from "@/zod-schemas/auth";
import { useVerifyEmailMutation } from "@/hooks/mutations/useVerifyEmailMutation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Loader2Icon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function VerifyEmailForm() {
  const [email, setEmail] = useState<string>("");
  const [isResending, setIsResending] = useState(false);
  const { mutate: verifyEmail, isPending } = useVerifyEmailMutation();

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  const code = watch("code");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onSubmit = (data: VerifyEmailFormData) => {
    verifyEmail({ ...data, email });
  };

  const handleResendCode = async () => {
    if (!email) return;

    setIsResending(true);
    try {
      await authService.resendVerificationCode(email);
      toast.success("Verification code resent!");
    } catch (error: api) {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We sent a verification code to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Field>
            <FieldLabel className="text-center block">
              Enter verification code
            </FieldLabel>
            <div className="flex justify-center mt-2">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setValue("code", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.code && (
              <p className="text-sm text-destructive mt-1 text-center">
                {errors.code.message}
              </p>
            )}
          </Field>

          <Button
            type="submit"
            disabled={isPending || code.length !== 6}
            className="w-full"
          >
            {isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Verify Email"
            )}
          </Button>

          <FieldDescription className="text-center">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="underline underline-offset-4 hover:text-primary disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </FieldDescription>
        </form>
      </CardContent>
    </Card>
  );
}
