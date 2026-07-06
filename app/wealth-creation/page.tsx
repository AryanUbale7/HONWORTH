import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArmPageLayout } from "@/components/layout/ArmPageLayout";
import { wealthCreationContent } from "@/content/pages";
import { getPostsByArm } from "@/lib/sanity/api";
import { Sprout, Target, TrendingUp, RefreshCw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${wealthCreationContent.title} | Honworth`,
  description: "Goal-based strategies for building and compounding wealth over the long term, tailored to your family's unique aspirations.",
  openGraph: {
    title: `${wealthCreationContent.title} | Honworth`,
    description: "Goal-based strategies for building and compounding wealth over the long term, tailored to your family's unique aspirations.",
    url: "https://honworth.in/wealth-creation",
  }
};

export const revalidate = 60; // ISR for related posts

export default async function WealthCreationPage() {
  const relatedPosts = await getPostsByArm("Creation");

  return (
    <>
      <Header />
      <main className="flex-grow bg-white">
        <ArmPageLayout
          title={wealthCreationContent.title}
          headline={wealthCreationContent.headline}
          descriptionText1="Our philosophy is rooted in long-term, goal-based investing."
          subheading="Disciplined Allocation"
          descriptionText2="We focus on steady, disciplined asset allocation rather than chasing short-term market trends."
          disclaimer={wealthCreationContent.disclaimer}
          armTag="Creation"
          icon={<Sprout size={32} strokeWidth={1.5} />}
          features={[
            { icon: <Target size={32} strokeWidth={1.5} />, label: "Goal-Based" },
            { icon: <TrendingUp size={32} strokeWidth={1.5} />, label: "Long-Term Focus" },
            { icon: <RefreshCw size={32} strokeWidth={1.5} />, label: "Ongoing Review" }
          ]}
          relatedPosts={relatedPosts}
        >
          {wealthCreationContent.blocks?.map((block, idx) => (
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
