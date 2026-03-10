import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types/dashboard.types";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const NOTIFICATION_QUERY_KEY = ["notifications"];

let socket: Socket | null = null;

function getSocket(token: string): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
}

function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}

export function useNotificationsSocket(token: string | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;

    const client = getSocket(token);

    client.on("notification", (notification: Notification) => {
      // prepend new notification to existing cache
      queryClient.setQueryData<Notification[]>(
        NOTIFICATION_QUERY_KEY,
        (prev) => [notification, ...(prev ?? [])]
      );
    });

    return () => {
      client.off("notification");
      disconnectSocket();
    };
  }, [token, queryClient]);
}