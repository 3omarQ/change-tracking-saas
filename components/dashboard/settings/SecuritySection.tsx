"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2Icon, LockIcon } from "lucide-react";
import { JobDetailSection } from "@/components/dashboard/job-detail/JobDetailSection";
import { useChangePassword } from "@/hooks/useChangePassword";

const schema = z.object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export function SecuritySection() {
    const { mutate: changePassword, isPending } = useChangePassword();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        changePassword(
            { currentPassword: data.currentPassword, newPassword: data.newPassword },
            { onSuccess: () => reset() }
        );
    };

    return (
        <JobDetailSection icon={LockIcon} label="Security">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" {...register("currentPassword")} className="max-w-sm" />
                    {errors.currentPassword && (
                        <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" {...register("newPassword")} className="max-w-sm" />
                    {errors.newPassword && (
                        <p className="text-xs text-destructive">{errors.newPassword.message}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm new password</Label>
                    <Input id="confirmPassword" type="password" {...register("confirmPassword")} className="max-w-sm" />
                    {errors.confirmPassword && (
                        <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <Button type="submit" size="sm" disabled={isPending}>
                    {isPending && <Loader2Icon className="h-3.5 w-3.5 animate-spin mr-1.5" />}
                    Change password
                </Button>
            </form>
        </JobDetailSection>
    );
}