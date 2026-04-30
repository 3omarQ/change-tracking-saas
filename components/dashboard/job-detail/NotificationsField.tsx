import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { JobDetailField } from "./JobDetailField";

interface NotificationFieldProps {
  label: string;
  enabled: boolean;
}

export function NotificationField({ label, enabled }: NotificationFieldProps) {
  return (
    <JobDetailField
      label={label}
      value={
        enabled ? (
          <span className="flex items-center gap-1.5 text-emerald-600 text-sm">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            Enabled
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <XCircleIcon className="h-3.5 w-3.5" />
            Disabled
          </span>
        )
      }
    />
  );
}
