"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function RefreshLoader() {
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Ref untuk menandai apakah proses refresh sebelumnya benar-benar berjalan
  const wasRefreshing = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let fadeTimeout: NodeJS.Timeout;
    let initTimeout: NodeJS.Timeout;

    if (isRefreshing) {
      // 1. Mulai proses Refresh
      wasRefreshing.current = true;
      initTimeout = setTimeout(() => {
        setIsVisible(true);
        setProgress(5);
      }, 0);

      // Naikkan nilai progress secara berkala setiap 300ms secara acak
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) return prev; // Mentok di 85% untuk menunggu respon asli backend

          // Bertambah acak antara 5% - 12% agar terasa natural
          const increment = Math.floor(Math.random() * 8) + 5;
          return Math.min(prev + increment, 85);
        });
      }, 300);
    } else if (wasRefreshing.current) {
      // 2. Skenario ketika isRefreshing berubah dari TRUE ke FALSE (Selesai)
      wasRefreshing.current = false;
      setProgress(100); // Langsung tembak ke 100% (memicu animasi penuh Shadcn)

      initTimeout = setTimeout(() => {
        setProgress(100);
      }, 0);

      // Beri jeda sejenak agar user melihat progress bar penuh (100%),
      // baru kemudian sembunyikan (fade out) komponennya
      fadeTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 600); // 600ms sangat pas dengan durasi transisi CSS bawaan Shadcn
    }

    return () => {
      clearTimeout(initTimeout);
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [isRefreshing]);

  // Jika sedang tidak me-refresh dan transisi fade-out selesai, hilangkan dari DOM
  if (!isVisible && !isRefreshing) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-9999 h-0.75 w-full transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* rounded-none: agar siku kotak pas menempel di pojok layar browser.
        bg-transparent: agar background penampung tidak menghalangi konten web di bawahnya.
      */}
      <Progress
        value={progress}
        className="h-full w-full rounded-none bg-transparent"
      />
    </div>
  );
}
