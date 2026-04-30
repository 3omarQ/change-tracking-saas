import { Log } from "@/types/dashboard.types";
import { useState, useEffect } from "react";
import { useSocket } from "@/context/SocketContext";

export function useExecutionLogs(executionId: string, initialLogs: Log[]) {
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const socket = useSocket();

  useEffect(() => {
    if (initialLogs.length > 0) {
      setLogs(initialLogs);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialLogs.length]);

  useEffect(() => {
    if (!socket) return;
    const handler = (payload: { executionId: string; log: Log }) => {
      if (payload.executionId !== executionId) return;
      setLogs((prev) => {
        if (prev.find((l) => l.id === payload.log.id)) return prev;
        return [...prev, payload.log];
      });
    };
    socket.on("execution:log", handler);
    return () => { socket.off("execution:log", handler); };
  }, [socket, executionId]);

  return logs;
}