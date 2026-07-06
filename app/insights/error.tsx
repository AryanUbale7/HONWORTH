"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default function InsightsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-32 text-center bg-ivory">
        <h2 className="text-3xl font-serif text-deep-green mb-4">Content temporarily unavailable</h2>
        <p className="text-charcoal/80 mb-8 max-w-md mx-auto">
          We are currently unable to load our insights. Please try again in a few moments.
        </p>
        <Button onClick={() => reset()} variant="primary">
          Try again
        </Button>
      </main>
      <Footer />
    </>
  );
}
