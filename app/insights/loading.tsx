import React from 'react';
import { BrandPreloader } from '@/components/ui/BrandPreloader';
import { Section } from '@/components/layout/Section';

export default function InsightsLoading() {
  return (
    <main className="flex-grow bg-ivory min-h-screen flex flex-col justify-center">
      <Section bgColor="ivory" className="flex flex-col items-center justify-center">
        <BrandPreloader size={100} />
        <p className="mt-8 text-charcoal/60 font-serif text-xl tracking-wide animate-pulse">Loading insights...</p>
      </Section>
    </main>
  );
}
