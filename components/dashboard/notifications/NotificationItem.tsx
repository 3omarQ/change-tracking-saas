import { Notification, NotificationType } from "@/types/dashboard.types";
import { CheckCircleIcon, XCircleIcon, ArrowRightLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ICON_MAP: Record<NotificationType, React.ReactNode> = {
  EXECUTION_DONE: <CheckCircleIcon className="h-4 w-4 text-emerald-500 shrink-0" />,
  EXECUTION_FAILED: <XCircleIcon className="h-4 w-4 text-destructive shrink-0" />,
  EXECUTION_DIFF: <ArrowRightLeftIcon className="h-4 w-4 text-primary shrink-0" />,
};

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const isUnread = !notification.read;

  const content = (
    <div className="flex items-start gap-3 px-4 py-3">
      {ICON_MAP[notification.type]}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn("text-xs font-medium ", isUnread && "font-semibold text-foreground")}>
            {notification.title}
          </span>
          {isUnread && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          )}
        </div>
        <span className="text-xs text-muted-foreground ">
          {notification.body}
        </span>
        <span className="text-xs text-muted-foreground/60">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );

  const className = cn(
    "w-full text-left hover:bg-accent/50 transition-colors",
    isUnread && "bg-accent/20"
  );

  if (notification.jobId) {
    return (
      <Link
        href={`/dashboard/jobs/${notification.jobId}/runs`}
        className={className}
        onClick={() => onRead(notification.id)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={() => onRead(notification.id)}>
      {content}
    </button>
  );
}