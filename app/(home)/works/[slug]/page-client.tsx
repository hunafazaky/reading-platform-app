"use client"; // WAJIB ADA untuk menggunakan useQuery

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function PageClient({ id }: { id: string }) {
  const { isPending, error, data, isFetching } = useQuery({
    // 1. Masukkan id ke dalam queryKey agar cache beda tiap project
    queryKey: ["work", id], 
    queryFn: async () => {
      const response = await api.get(`/works/${id}`);
      return response.data;
    },
    // (Opsional) Jangan fetch jika id tidak valid
    enabled: id !== "not-found", 
  });

  if (isPending) return <section>Loading data project...</section>;

  if (error) return <section>Error: {error.message}</section>;

  // 2. PASTIKAN merender properti objek, bukan langsung {data}
  return (
    <section>
      {isFetching && <span>Memperbarui di background...</span>}
      
      {/* Ganti .title dan .description sesuai dengan struktur JSON dari API kamu */}
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p>{data?.description}</p>
      
      {/* Untuk debugging sementara jika ingin melihat seluruh isi data: */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </section>
  );
}