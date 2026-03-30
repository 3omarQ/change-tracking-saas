import { PageHeader } from "@/components/dashboard/shared/PageHeader";
import { ProfileSection } from "@/components/dashboard/settings/ProfileSection";
import { SecuritySection } from "@/components/dashboard/settings/SecuritySection";
import { NotificationsSection } from "@/components/dashboard/settings/NotificationsSection";
import { DangerZone } from "@/components/dashboard/settings/DangerZone";

export default function SettingsPage() {
    return (
        <div className="space-y-6 pb-16">
            <PageHeader title="Settings" />
            <div className="max-w-2xl space-y-4">
                <ProfileSection />
                <SecuritySection />
                <NotificationsSection />
                <DangerZone />
            </div>
        </div>
    );
}