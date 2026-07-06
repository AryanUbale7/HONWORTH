import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArmPageLayout } from "@/components/layout/ArmPageLayout";
import { wealthProtectionContent } from "@/content/pages";
import { getPostsByArm } from "@/lib/sanity/api";
import { ShieldCheck, Shield, Umbrella, Handshake } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${wealthProtectionContent.title} | Honworth`,
  description: "Term-first protection strategies designed to safeguard your family's assets and income against unforeseen events.",
  openGraph: {
    title: `${wealthProtectionContent.title} | Honworth`,
    description: "Term-first protection strategies designed to safeguard your family's assets and income against unforeseen events.",
    url: "https://honworth.in/wealth-protection",
  }
};

export const revalidate = 60; // ISR for related posts

export default async function WealthProtectionPage() {
  const relatedPosts = await getPostsByArm("Protection");

  return (
    <>
      <Header />
      <main className="flex-grow bg-white">
        <ArmPageLayout
          title={wealthProtectionContent.title}
          headline={wealthProtectionContent.headline}
          descriptionText1="We believe that insurance is strictly for protection, not investment."
          subheading="Safeguarding Assets"
          descriptionText2="Our term-first philosophy ensures that your family and assets are safeguarded against unforeseen circumstances."
          disclaimer={wealthProtectionContent.disclaimer}
          armTag="Protection"
          icon={<ShieldCheck size={32} strokeWidth={1.5} />}
          features={[
            { icon: <Shield size={32} strokeWidth={1.5} />, label: "Term-First" },
            { icon: <Umbrella size={32} strokeWidth={1.5} />, label: "Pure Protection" },
            { icon: <Handshake size={32} strokeWidth={1.5} />, label: "Reliable Partners" }
          ]}
          relatedPosts={relatedPosts}
        >
          {wealthProtectionContent.blocks?.map((block, idx) => (
            <div key={idx} className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl text-deep-green mb-4">{block.heading}</h2>
              <p className="text-charcoal leading-relaxed">{block.text}</p>
            </div>
          ))}
        </ArmPageLayout>
      </main>
      <Footer />
    </>
  );
}
