"use client";

import { useEffect, useRef } from "react"; // 1. Import useRef
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setRefreshing = useAuthStore((state) => state.setRefreshing);

  // 2. Gunakan flag useRef untuk mengunci eksekusi di React StrictMode
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Jika sudah pernah jalan, kunci dan batalkan eksekusi berikutnya
    if (hasInitialized.current) return;

    // Gunakan AbortController untuk membatalkan request jika komponen unmount
    const controller = new AbortController();

    const initializeAuth = async () => {
      const currentToken = useAuthStore.getState().accessToken;

      if (!currentToken) {
        hasInitialized.current = true; // Tandai bahwa proses sudah diambil alih
        setRefreshing(true);

        try {
          // Masukkan signal controller agar request bisa di-cancel jika crash/sleep
          const response = await api.post(
            "/users/refresh",
            {},
            { signal: controller.signal },
          );
          const { accessToken, user } = response.data;
          setAuth(accessToken, user || useAuthStore.getState().user);
        } catch (error) {
          // Jangan bersihkan auth jika error dipicu oleh pembatalan request (Abort)
          const errorName = error instanceof Error ? error.name : "";

          if (errorName !== "CanceledError") {
            console.log(error);
            clearAuth();
          }
        } finally {
          setRefreshing(false);
        }
      }
    };

    initializeAuth();

    // 3. Wajib: Fungsi Pembersih (Cleanup Function)
    return () => {
      controller.abort(); // Batalkan request HTTP yang masih menggantung jika PC sleep/unmount
    };
  }, [setAuth, clearAuth, setRefreshing]); // Dependency tetap aman karena dikunci useRef

  return <>{children}</>;
}
