"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/zod-schemas/auth";
import { useRegisterMutation } from "@/hooks/mutations/useRegisterMutation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Loader2Icon } from "lucide-react";
import SeparatorWithText from "@/components/ui/separator-with-text";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authService } from "@/services/auth.service";
import Link from "next/link";

export function RegisterForm() {
  const { mutate: register, isPending } = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...registerField("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...registerField("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive ">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              {...registerField("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive ">
                {errors.password.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...registerField("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive ">
                {errors.confirmPassword.message}
              </p>
            )}
          </Field>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>

          <SeparatorWithText text="Or continue with" />

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => authService.socialLogin("google")}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => authService.socialLogin("github")}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </FieldDescription>
        </form>
      </CardContent>
    </Card>
  );
}
