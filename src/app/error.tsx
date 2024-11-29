"use client";

import { Button } from "@/components/ui/button";

export default function ErrorContainer({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center gap-2 justify-center">
      <h2 className="text-2xl font-medium">Something went wrong!</h2>
      <pre className="whitespace-pre-wrap font-mono">{error.message}</pre>
      <Button type="reset" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
