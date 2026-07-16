import PageClient from "./page-client";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Read({ params }: PageProps) {
  const { slug } = await params;
  const slugParts = slug.split("-");
  const workId = slugParts.pop() || "not-found";

  return (
    <div>
      {/* Oper ID yang sudah bersih ke Client Component */}
      <PageClient id={workId} />
    </div>
  );
}