"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { getCookie, deleteCookie } from "cookies-next";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    setMounted(true);

    const initializeAuth = async () => {
      const isSigned = getCookie("is_signed");
      const currentToken = useAuthStore.getState().accessToken;

      if (isSigned && !currentToken) {
        try {
          const response = await api.post("/users/refresh");
          const { accessToken, user } = response.data;
          
          // PERBAIKAN DI SINI:
          // Jika endpoint /refresh tidak mengirim data user, 
          // ambil kembali data user yang sudah di-persist di localStorage
          const existingUser = useAuthStore.getState().user;
          const finalUser = user || existingUser;

          if (finalUser) {
            setAuth(accessToken, finalUser);
          } else {
            // Jika data benar-benar corrupt/hilang dari localStorage
            throw new Error("Data user hilang dari penyimpanan lokal");
          }
          
        } catch (error) {
          console.error("Silent refresh gagal saat inisialisasi:", error);
          clearAuth();
          deleteCookie("is_signed");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [setAuth, clearAuth]);

  if (!mounted) {
    return <>{children}</>;
  }

  if (loading && getCookie("is_signed")) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-sm opacity-70">
        Memuat sesi...
      </div>
    );
  }

  return <>{children}</>;
}