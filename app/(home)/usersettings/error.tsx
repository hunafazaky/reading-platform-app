"use client"; // Error boundary di Next.js WAJIB menggunakan "use client"

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center p-8">
      <div className="text-amber-700">
        <h2 className="text-xl font-bold">Something wrong!</h2>
        <p className="text-sm opacity-80 mt-1">{error.message}</p>
      </div>
      <Button onClick={() => reset()} variant="outline">
        Try again
      </Button>
    </section>
  );
}
