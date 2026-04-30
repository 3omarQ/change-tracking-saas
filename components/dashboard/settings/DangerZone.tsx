"use client";
import { Trash2Icon } from "lucide-react";
import { JobDetailSection } from "@/components/dashboard/job-detail/JobDetailSection";
import { DeleteButton } from "@/components/dashboard/shared/DeleteButton";
import { usersService } from "@/services/users.service";
import { useRouter } from "next/navigation";

export function DangerZone() {
    const router = useRouter();
    return (
        <JobDetailSection icon={Trash2Icon} label="Danger Zone">
            <div className="flex items-center justify-between max-w-sm">
                <div className="space-y-0.5">
                    <p className="text-sm font-medium">Delete account</p>
                    <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all data. This cannot be undone.
                    </p>
                </div>
                <DeleteButton
                    title="Delete account?"
                    description={
                        <>
                            <p>This will permanently delete your account and all associated data:</p>
                            <ul className="list-disc list-inside mt-2 space-y-0.5">
                                <li>All target URLs and datapoints</li>
                                <li>All jobs and their executions</li>
                                <li>All scraped results and logs</li>
                            </ul>
                            <p className="mt-2 font-medium text-foreground">This cannot be undone.</p>
                        </>
                    }
                    action={() => usersService.deleteAccount()}
                    redirectTo="/auth/login"
                    successMessage="Account deleted."
                    errorMessage="Failed to delete account."
                />
            </div>
        </JobDetailSection>
    );
}