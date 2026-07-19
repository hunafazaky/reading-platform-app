import { Spinner } from "@/components/ui/spinner";

export function SpinnerFetch() {
  return (
    <div className="absolute top-0 right-0 m-4 flex items-center gap-2 font-bold opacity-60">
      <Spinner />
      <span>Fetching...</span>
    </div>
  );
}
