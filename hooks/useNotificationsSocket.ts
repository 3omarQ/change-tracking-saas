import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types/dashboard.types";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const NOTIFICATION_QUERY_KEY = ["notifications"];

let socketSingleton: Socket | null = null;

function getSocket(token: string): Socket {
  if (!socketSingleton) {
    socketSingleton = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socketSingleton;
}

export function useNotificationsSocket(token: string | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;

    const client = getSocket(token);

    client.on("notification", (notification: Notification) => {
      queryClient.setQueryData<Notification[]>(
        NOTIFICATION_QUERY_KEY,
        (prev) => [notification, ...(prev ?? [])]
      );
    });

    return () => {
      client.off("notification");
    };
  }, [token, queryClient]);

  return { socket: token ? getSocket(token) : null };
}