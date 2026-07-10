"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { getCookie, deleteCookie } from "cookies-next";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setRefreshing = useAuthStore((state) => state.setRefreshing);

  useEffect(() => {
    const initializeAuth = async () => {
      const isSigned = getCookie("is_signed");
      const currentToken = useAuthStore.getState().accessToken;

      if (isSigned && !currentToken) {
        setRefreshing(true); // Beritahu global store kalau kita sedang refresh
        try {
          const response = await api.post("/users/refresh");
          const { accessToken, user } = response.data;
          setAuth(accessToken, user || useAuthStore.getState().user);
        } catch (error) {
          console.log(error);
          clearAuth();
          deleteCookie("is_signed");
        } finally {
          setRefreshing(false); // Selesai
        }
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth, setRefreshing]);

  return <>{children}</>;
}
