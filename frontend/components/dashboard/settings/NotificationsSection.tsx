"use client";
import { useEffect } from "react";
import { BellIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { JobDetailSection } from "@/components/dashboard/job-detail/JobDetailSection";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useProfile } from "@/hooks/useProfile";

export function NotificationsSection() {
    const { data: user } = useProfile();
    const { mutate: updateSettings, isPending } = useNotificationSettings();

    return (
        <JobDetailSection icon={BellIcon} label="Notifications">
            <div className="space-y-4">
                <div className="flex items-center justify-between max-w-sm">
                    <div className="space-y-0.5">
                        <Label>Email notifications</Label>
                        <p className="text-xs text-muted-foreground">
                            Receive job notifications via email in addition to in-app alerts.
                        </p>
                    </div>
                    <Switch
                        checked={user?.notifyByEmail ?? false}
                        disabled={isPending || !user}
                        onCheckedChange={(checked) => updateSettings(checked)}
                    />
                </div>
            </div>
        </JobDetailSection>
    );
}