import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArmPageLayout } from "@/components/layout/ArmPageLayout";
import { wealthLegacyContent } from "@/content/pages";
import { getPostsByArm } from "@/lib/sanity/api";
import { Castle, Map, ArrowRightLeft, Scale } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${wealthLegacyContent.title} | Honworth`,
  description: "Seamless legacy planning and transition strategies to honor your family's wealth and principles for generations to come.",
  openGraph: {
    title: `${wealthLegacyContent.title} | Honworth`,
    description: "Seamless legacy planning and transition strategies to honor your family's wealth and principles for generations to come.",
    url: "https://honworth.in/wealth-legacy",
  }
};

export const revalidate = 60; // ISR for related posts

export default async function WealthLegacyPage() {
  const relatedPosts = await getPostsByArm("Legacy");

  return (
    <>
      <Header />
      <main className="flex-grow bg-white">
        <ArmPageLayout
          title={wealthLegacyContent.title}
          headline={wealthLegacyContent.headline}
          descriptionText1="A comprehensive wealth strategy isn't complete without a plan for the future."
          subheading="Seamless Transitions"
          descriptionText2="We facilitate succession and estate planning, including Wills, nominations, and private trusts."
          disclaimer={wealthLegacyContent.disclaimer}
          armTag="Legacy"
          icon={<Castle size={32} strokeWidth={1.5} />}
          features={[
            { icon: <Map size={32} strokeWidth={1.5} />, label: "Future Planning" },
            { icon: <ArrowRightLeft size={32} strokeWidth={1.5} />, label: "Seamless Transition" },
            { icon: <Scale size={32} strokeWidth={1.5} />, label: "Legal Coordination" }
          ]}
          relatedPosts={relatedPosts}
        >
          {wealthLegacyContent.blocks?.map((block, idx) => (
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
