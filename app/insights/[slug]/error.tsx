"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default function InsightDetailError({
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
        <h2 className="text-3xl font-serif text-deep-green mb-4">Post not found</h2>
        <p className="text-charcoal/80 mb-8 max-w-md mx-auto">
          We couldn't load this insight. It may have been removed or temporarily unavailable.
        </p>
        <Button onClick={() => window.location.href = '/insights'} variant="primary">
          Back to Insights
        </Button>
      </main>
      <Footer />
    </>
  );
}
