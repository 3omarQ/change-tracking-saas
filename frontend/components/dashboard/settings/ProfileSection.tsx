"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2Icon, UserIcon } from "lucide-react";
import { JobDetailSection } from "@/components/dashboard/job-detail/JobDetailSection";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

const schema = z.object({ name: z.string().min(2, "Name must be at least 2 characters") });
type FormData = z.infer<typeof schema>;

export function ProfileSection() {
    const { data: user } = useProfile();
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { name: "" },
    });

    useEffect(() => {
        if (user) reset({ name: user.name });
    }, [user, reset]);

    return (
        <JobDetailSection icon={UserIcon} label="Profile">
            <form onSubmit={handleSubmit((d) => updateProfile(d.name))} className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Display name</Label>
                    <Input id="name" {...register("name")} className="max-w-sm" />
                    {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input value={user?.email ?? ""} disabled className="max-w-sm" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                <Button type="submit" size="sm" disabled={!isDirty || isPending}>
                    {isPending && <Loader2Icon className="h-3.5 w-3.5 animate-spin mr-1.5" />}
                    Save changes
                </Button>
            </form>
        </JobDetailSection>
    );
}