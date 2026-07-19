// app/works/[slug]/edit/page.tsx
import EditWorkClient from "./page-client";
import axios from "axios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getWorkData(id: string) {
  const baseUrl = process.env.BACKEND_API_URL;
  const res = await axios.get(`${baseUrl}/api/works/${id}`);
  return res.data;
}

export default async function EditPage({ params }: PageProps) {
  const { slug } = await params;
  const slugParts = slug.split("-");
  const workId = slugParts.pop() || "";

  // 1. Fetch data saat ini langsung dari server (cepat & tanpa flicker loading)
  const currentWork = await getWorkData(workId);

  // 2. Lempar datanya ke form TanStack Query kita
  return <EditWorkClient initialData={currentWork} />;
}
