"use client"; // WAJIB CLIENT COMPONENT

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  // Menggunakan useState mencegah queryClient terbuat ulang setiap kali render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data dianggap segar selama 1 menit
            refetchOnWindowFocus: false, // Menghindari refetch otomatis saat pindah tab (opsional)
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
