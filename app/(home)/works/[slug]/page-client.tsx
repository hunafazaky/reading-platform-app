"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SpinnerFetch } from "@/components/spinner-fetch";

export default function PageClient({ id }: { id: string }) {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["work", id],
        queryFn: async () => {
            const response = await api.get(`/works/${id}`);
            return response.data;
        },
        enabled: id !== "not-found",
    });

    if (isPending) return <section>Loading data project...</section>;

    if (error) return <section>Error: {error.message}</section>;

    // 2. PASTIKAN merender properti objek, bukan langsung {data}
    return (
        <section>
            {isFetching && <SpinnerFetch />}
            <div className="w-2/3 m-auto">
                {/* Ganti .title dan .description sesuai dengan struktur JSON dari API kamu */}
                <div className="border-b-2 border-white py-4 my-4">
                    <h1 className="text-2xl font-bold text-center">
                        {data.title}
                    </h1>
                    <p className="text-center opacity-70">
                        Written by: {data.writer.pen_name}
                    </p>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-4">
                        <span className="opacity-70">
                            Total Read: {data.reader_count}
                        </span>
                        <span className="opacity-70">
                            Rating: {data.rating_count}
                        </span>
                    </div>
                    {data.categories.length > 0 &&
                        data.categories.map(
                            (category: string, index: number) => (
                                <span key={index}>{category}</span>
                            ),
                        )}
                </div>
                <p>{data.body}</p>
                {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            </div>
        </section>
    );
}
