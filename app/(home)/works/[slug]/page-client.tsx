"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SpinnerFetch } from "@/components/spinner-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function PageClient({ id }: { id: string }) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["work", id],
    queryFn: async () => {
      const response = await api.get(`/works/${id}`);
      return response.data;
    },
    enabled: id !== "not-found",
  });

  if (isPending)
    return (
      <section className="flex flex-col justify-center items-center">
        <div className="lg:w-3/4 xl:w-2/3 mx-8">
          <div className="border-b-2 py-4 my-4">
            <Skeleton className="h-6 mb-2 w-full" />
            <Skeleton className="h-2 mb-2 w-1/3 mx-auto" />
          </div>
          <div className="flex justify-between my-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/5" />
          </div>
          <Skeleton className="h-4 mb-2 w-full" />
          <Skeleton className="h-4 mb-2 w-full" />
          <Skeleton className="h-4 mb-2 w-full" />
          <Skeleton className="h-4 mb-2 w-3/4" />
        </div>
      </section>
    );

  if (error) return <section>Error: {error.message}</section>;

  return (
    <section className="flex flex-col justify-center items-center">
      {isFetching && <SpinnerFetch />}
      <div className="lg:w-3/4 xl:w-2/3 mx-8">
        <div className="border-b-2 border-white py-4 my-4">
          <h1 className="text-2xl font-bold text-center">{data.title}</h1>
          <p className="text-center opacity-90">
            Written by: {data.writer.pen_name}
          </p>
        </div>
        <div className="flex gap-4 my-4 opacity-70 text-sm">
          <span>Total Read: {data.reader_count}</span>
          <span>Rating: {data.rating_count}</span>
        </div>
        <p>{data.body}</p>
        {data.categories.length > 0 ? (
          data.categories.map((category: string, index: number) => (
            // <span key={index}>{category}</span>
            <Button
              key={index}
              variant="link"
              className="text-sm px-0 opacity-70 mr-2"
            >
              #{category}
            </Button>
          ))
        ) : (
          <Button variant="link" className="text-sm px-0 opacity-70 mr-2 disabled">
            #uncategorized
          </Button>
        )}
      </div>
    </section>
  );
}
