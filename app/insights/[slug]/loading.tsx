import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";

export default function InsightDetailLoading() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-6">
               <div className="h-6 w-24 bg-sage-mist animate-pulse rounded"></div>
               <div className="h-6 w-20 bg-sage-mist animate-pulse rounded"></div>
            </div>
            <div className="h-12 w-full bg-sage-mist animate-pulse rounded mb-4"></div>
            <div className="h-12 w-3/4 bg-sage-mist animate-pulse rounded mb-8"></div>
            <div className="h-4 w-32 bg-sage-mist animate-pulse rounded"></div>
          </div>
        </Section>
        <Section bgColor="white" className="py-12">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
             <div className="h-96 w-full bg-sage-mist/50 animate-pulse rounded-sm mb-8"></div>
             <div className="h-4 w-full bg-sage-mist/50 animate-pulse rounded"></div>
             <div className="h-4 w-full bg-sage-mist/50 animate-pulse rounded"></div>
             <div className="h-4 w-5/6 bg-sage-mist/50 animate-pulse rounded"></div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
