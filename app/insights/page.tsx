import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { getAllPosts } from "@/lib/sanity/api";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & News | Honworth",
  description: "Read the latest perspectives on wealth management, structured for the long term. Articles, news, and market insights from Honworth.",
  openGraph: {
    title: "Insights & News | Honworth",
    description: "Read the latest perspectives on wealth management, structured for the long term.",
    url: "https://honworth.in/insights",
  }
};

export const revalidate = 60; // ISR revalidation

export default async function InsightsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const posts = await getAllPosts();
  
  const armFilter = searchParams.arm as string | undefined;
  const typeFilter = searchParams.postType as string | undefined;

  const filteredPosts = posts.filter((post) => {
    if (armFilter && post.arm !== armFilter) return false;
    if (typeFilter && post.postType !== typeFilter) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20 py-12 md:py-16">
          <div className="max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">Insights & News</h1>
              <p className="text-charcoal/80 text-lg">Perspectives on wealth, structured for the long term.</p>
            </div>
            
            {/* Filter Controls via Search Params */}
            <div className="flex flex-wrap gap-4 text-sm">
              <Link 
                href="/insights" 
                className={`px-4 py-2 rounded border transition-colors ${!armFilter && !typeFilter ? 'bg-gold text-ivory border-gold' : 'border-sage/50 text-charcoal hover:border-gold'}`}
              >
                All
              </Link>
              <Link 
                href="?arm=Creation" 
                className={`px-4 py-2 rounded border transition-colors ${armFilter === 'Creation' ? 'bg-gold text-ivory border-gold' : 'border-sage/50 text-charcoal hover:border-gold'}`}
              >
                Wealth Creation
              </Link>
              <Link 
                href="?postType=Insight" 
                className={`px-4 py-2 rounded border transition-colors ${typeFilter === 'Insight' ? 'bg-gold text-ivory border-gold' : 'border-sage/50 text-charcoal hover:border-gold'}`}
              >
                Insights
              </Link>
            </div>
          </div>
        </Section>

        <Section bgColor="white" className="py-12 md:py-20">
          {filteredPosts.length === 0 ? (
            <p className="text-charcoal/70 text-center py-20">No posts found matching the current filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredPosts.map((post) => (
                <Link key={post._id} href={`/insights/${post.slug}`} className="group flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
                  {post.coverImage && (
                    <div className="aspect-[4/3] w-full bg-sage-mist overflow-hidden rounded-sm mb-4">
                      <Image
                        src={urlForImage(post.coverImage)?.url() || ""}
                        alt={post.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-deep-green bg-sage-mist px-2 py-1 rounded-sm">{post.arm}</span>
                    <span className="text-xs uppercase tracking-wider text-charcoal/60">{post.postType}</span>
                  </div>
                  <h2 className="font-serif text-2xl text-deep-green mb-2 group-hover:text-gold transition-colors">{post.title}</h2>
                  <time className="text-sm text-charcoal/60">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
