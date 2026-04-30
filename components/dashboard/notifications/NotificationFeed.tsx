import { Notification } from "@/types/dashboard.types";
import { NotificationItem } from "./NotificationItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationFeedProps {
  notifications: Notification[];
  onRead: (id: string) => void;
}

export function NotificationFeed({ notifications, onRead }: NotificationFeedProps) {
  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No notifications yet.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="divide-y divide-border/60">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} onRead={onRead} />
        ))}
      </div>
    </ScrollArea>
  );
}