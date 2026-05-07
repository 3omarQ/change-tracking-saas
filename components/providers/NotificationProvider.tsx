"use client";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";
import { useAuth } from "@/hooks/useAuth";
import { SocketContext } from "@/context/SocketContext";

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("accessToken") : null;
  const { socket } = useNotificationsSocket(token);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}