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

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    interface Work {
        id: string;
        title: string;
        body: string;
        categories: string[];
    }

    return (
        <div>
            <div>{isFetching ? "Updating..." : ""}</div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {data.works.map((work: Work) => (
                    <li key={work.id}>
                        <CardWork work={work} />
                    </li>
                ))}
            </ul>
            <p>{data.page}</p>
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                {/* <ReactQueryDevtools /> */}
                <Work />
            </QueryClientProvider>
            {/* <Image
        src="/dragon-book.avif"
        width={1000}
        height={760}
        className="hidden md:block w-200"
        alt="Dragon love reading"
        loading="eager"
        />
        <Image
        src="/dragon-book.avif"
        width={560}
        height={620}
        className="block md:hidden w-200"
        alt="Dragon love reading"
        loading="eager"
      /> */}
        </div>
    );
}
