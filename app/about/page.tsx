import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { aboutContent } from "@/content/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${aboutContent.title} | Honworth`,
  description: "Learn about Honworth's philosophy, our team, and how we approach wealth management with a multi-generational perspective.",
  openGraph: {
    title: `${aboutContent.title} | Honworth`,
    description: "Learn about Honworth's philosophy, our team, and how we approach wealth management with a multi-generational perspective.",
    url: "https://honworth.in/about",
  }
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-deep-green mb-6">
              {aboutContent.headline}
            </h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              {aboutContent.description}
            </p>
          </div>
        </Section>

        <Section bgColor="white">
          <div className="max-w-3xl flex flex-col gap-12">
            {aboutContent.blocks?.map((block, idx) => (
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
