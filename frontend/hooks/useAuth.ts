"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/auth.types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch {
          localStorage.removeItem("user");
          return null;
        }
      }
      return null;
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(initializeAuth());
    setIsLoading(false);
  }, []);

  const isAuthenticated = !!user && !!localStorage.getItem("accessToken");

  return { user, isLoading, isAuthenticated };
};
