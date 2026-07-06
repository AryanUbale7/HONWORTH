import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { approachContent } from "@/content/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${approachContent.title} | Honworth`,
  description: "Discover our structured, principled approach to long-term wealth building, asset allocation, and mitigating market noise.",
  openGraph: {
    title: `${approachContent.title} | Honworth`,
    description: "Discover our structured, principled approach to long-term wealth building, asset allocation, and mitigating market noise.",
    url: "https://honworth.in/our-approach",
  }
};

export default function ApproachPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-deep-green mb-6">
              {approachContent.headline}
            </h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              {approachContent.description}
            </p>
          </div>
        </Section>

        <Section bgColor="white">
          <div className="max-w-3xl flex flex-col gap-12">
            {approachContent.blocks?.map((block, idx) => (
              <div key={idx}>
                <h2 className="font-serif text-2xl text-deep-green mb-4">{block.heading}</h2>
                <p className="text-charcoal leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
