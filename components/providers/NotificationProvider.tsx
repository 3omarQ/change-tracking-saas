"use client";
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket";
import { useAuth } from "@/hooks/useAuth";

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const token = isAuthenticated ? localStorage.getItem("accessToken") : null;
    useNotificationsSocket(token);
    return <>{children}</>;
}