"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CardWork } from "@/components/card-work";
import { CardWorkSkeleton } from "@/components/card-work-skeleton";
import { SpinnerFetch } from "@/components/spinner-fetch";
import { AppPagination } from "@/components/app-pagination";

interface Work {
  id: string;
  title: string;
  body: string;
  categories: string[];
  writer: {
    id: string;
  };
}

// Langsung jadikan ini sebagai export default
export default function Home() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await api.get("/history");
      console.log(response);
      return response.data;
    },
  });

  if (isPending)
    return (
      <section>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index}>
              <CardWorkSkeleton />
            </li>
          ))}
        </ul>
      </section>
    );

  if (error) return <section>An error has occurred: {error.message}</section>;

  return (
    <section className="relative">
      {isFetching && <SpinnerFetch />}
      {data.histories.length > 0 ? (
        <div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.histories.map((work: Work) => (
              <li key={work.id}>
                <CardWork work={work} />
              </li>
            ))}
          </ul>
          <AppPagination page={data.page} totalPages={data.totalPages} />
        </div>
      ) : (
        <div className="flex justify-center items-center p-40">
          <p className="text-xl opacity-70">There are no read history yet</p>
        </div>
      )}
    </section>
  );
}
