import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Metadata } from "next";
import { disclaimerContent } from "@/content/pages";

export const metadata: Metadata = {
  title: "Disclaimer | Honworth",
  description: "Important legal disclaimers regarding the use of Honworth's website and services.",
  openGraph: {
    title: "Disclaimer | Honworth",
    description: "Important legal disclaimers regarding the use of Honworth's website and services.",
    url: "https://honworth.in/disclaimer",
  }
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-4xl text-deep-green mb-4">
              {disclaimerContent.headline}
            </h1>
            <p className="text-charcoal/80">
              {disclaimerContent.description}
            </p>
          </div>
        </Section>

        <Section bgColor="white" className="py-12 md:py-20">
          <div className="max-w-3xl flex flex-col gap-10">
            {disclaimerContent.blocks?.map((block, idx) => (
              <div key={idx}>
                <h2 className="font-serif text-xl text-deep-green mb-3">{block.heading}</h2>
                <div className="bg-sage-mist/20 p-6 rounded-sm border border-sage/30">
                  <p className="text-charcoal/70 text-sm md:text-base uppercase tracking-wider font-semibold text-center">{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
