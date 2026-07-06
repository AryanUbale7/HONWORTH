import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/pages";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Honworth - Wealth Management",
  description: "A calm, structured approach to managing your family's assets, aspirations, and legacy. Honworth builds wealth strategies designed for generations.",
  openGraph: {
    title: "Home | Honworth",
    description: "A calm, structured approach to managing your family's assets.",
    url: "https://honworth.in",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-deep-green leading-tight mb-6">
              {homeContent.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {homeContent.hero.subheading}
            </p>
            <Link href="/contact" tabIndex={-1}>
              <Button variant="primary" className="text-base px-10 py-4">
                {homeContent.hero.cta}
              </Button>
            </Link>
          </div>
        </Section>

        {/* Wealth Arms Snapshot */}
        <Section bgColor="white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeContent.services.map((service, idx) => (
              <Card
                key={idx}
                title={service.title}
                description={service.description}
                linkHref={service.link}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
