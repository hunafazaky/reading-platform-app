"use client";

// import Image from "next/image";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "@/lib/api";
import { CardWork } from "@/components/card-work";
import { CardWorkSkeleton } from "@/components/card-work-skeleton";
// import { Divide } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const queryClient = new QueryClient();
function Work() {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["repoData"],
        queryFn: async () => {
            const response = await api.get("/works");
            // console.log(response.data)
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

    if (error) return "An error has occurred: " + error.message;

    interface Work {
        id: string;
        title: string;
        body: string;
        categories: string[];
    }

    return (
        <section>
            {isFetching && (
                <div className="absolute top-0 right-0 m-4 flex items-center gap-2 font-bold opacity-60">
                    <Spinner />
                    <span>Fetching...</span>
                </div>
            )}
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {data.works.map((work: Work) => (
                    <li key={work.id}>
                        <CardWork work={work} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function Home() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Work />
            </QueryClientProvider>
        </div>
    );
}
