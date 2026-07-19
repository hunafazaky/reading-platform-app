import PageClient from "./page-client";
import axios from "axios";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fungsi pengambilan data langsung di sisi server
async function getWorkData(id: string) {
  // Gunakan variabel PRIVATE (tanpa NEXT_PUBLIC_) agar URL backend aman
  const baseUrl = process.env.BACKEND_API_URL;

  const response = await axios.get(`${baseUrl}/api/works/${id}`);
  return response.data;
}

export default async function Read({ params }: PageProps) {
  const { slug } = await params;
  const slugParts = slug.split("-");
  const workId = slugParts.pop() || "not-found";

  if (workId === "not-found") {
    throw new Error("ID Karya tidak valid atau tidak ditemukan.");
  }

  // Fetch data di server (Next.js akan menampilkan loading.tsx selama proses ini)
  const data = await getWorkData(workId);

  return (
    <div>
      {/* Oper data yang sudah matang ke component pembantu */}
      <PageClient data={data} />
    </div>
  );
}
