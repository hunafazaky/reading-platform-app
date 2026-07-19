import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="lg:w-3/4 xl:w-2/3 mx-8 w-full">
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
}
