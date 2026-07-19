import { Button } from "@/components/ui/button";

interface WorkData {
  title: string;
  body: string;
  reader_count?: number;
  rating_count?: number;
  writer?: {
    pen_name: string;
  };
  categories?: string[];
}

export default function PageClient({ data }: { data: WorkData }) {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="lg:w-3/4 xl:w-2/3 mx-8">
        <div className="border-b-2 border-mist-200 py-4 my-4">
          <h1 className="text-2xl font-bold text-center">{data.title}</h1>
          <p className="text-center opacity-70">
            Written by: {data.writer?.pen_name || "Unknown"}
          </p>
        </div>

        <div className="flex gap-4 my-4 opacity-70 text-sm">
          <span>Total Read: {data.reader_count || 0}</span>
          <span>Rating: {data.rating_count || 0}</span>
        </div>

        <p className="whitespace-pre-line leading-relaxed">{data.body}</p>

        <div className="mt-6">
          {data.categories && data.categories.length > 0 ? (
            data.categories.map((category: string, index: number) => (
              <Button
                key={index}
                variant="link"
                className="text-sm px-0 opacity-70 mr-3"
              >
                #{category}
              </Button>
            ))
          ) : (
            <Button
              variant="link"
              className="text-sm px-0 opacity-70 mr-3 disabled"
            >
              #uncategorized
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
