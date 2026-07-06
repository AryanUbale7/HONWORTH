import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { getPostBySlug } from "@/lib/sanity/api";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  return {
    title: post ? `${post.title} | Honworth` : "Post Not Found",
    description: post ? `Read insights on ${post.arm} from Honworth.` : "",
    openGraph: post ? {
      title: `${post.title} | Honworth`,
      description: `Read insights on ${post.arm} from Honworth.`,
      url: `https://honworth.in/insights/${params.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    } : {}
  };
}

export const revalidate = 60; // ISR revalidation

export default async function InsightDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const portableTextComponents = {
    block: {
      normal: ({children}: any) => <p className="mb-6 leading-relaxed text-charcoal">{children}</p>,
      h2: ({children}: any) => <h2 className="text-3xl font-serif text-deep-green mt-12 mb-6">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-2xl font-serif text-deep-green mt-8 mb-4">{children}</h3>,
      blockquote: ({children}: any) => <blockquote className="border-l-4 border-gold pl-6 py-2 my-8 text-xl italic font-serif text-deep-green bg-sage-mist/20">{children}</blockquote>,
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-charcoal">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-charcoal">{children}</ol>,
    },
    marks: {
      link: ({children, value}: any) => {
        return (
          <a href={value.href} className="text-gold hover:underline underline-offset-4 font-medium" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      },
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.coverImage ? [urlForImage(post.coverImage)?.url()] : [],
    datePublished: post.publishedAt,
    author: [{
      '@type': 'Organization',
      name: 'Honworth',
      url: 'https://honworth.in'
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20 pt-16 pb-12">
          <div className="max-w-3xl mx-auto">
            <Link href="/insights" className="text-sm font-medium text-gold hover:text-gold/80 mb-8 inline-flex items-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Insights
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-deep-green bg-sage-mist px-3 py-1 rounded-sm">{post.arm}</span>
              <span className="text-xs uppercase tracking-widest text-charcoal/60">{post.postType}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-deep-green mb-6 leading-tight">
              {post.title}
            </h1>
            <time className="text-base text-charcoal/60 font-medium">
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </Section>

        <Section bgColor="white" className="py-12 md:py-20">
          <article className="max-w-3xl mx-auto">
            {post.coverImage && (
              <div className="mb-12 rounded-sm overflow-hidden bg-sage-mist aspect-[21/9]">
                <Image
                  src={urlForImage(post.coverImage)?.url() || ""}
                  alt={post.title}
                  width={1200}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}
            
            {post.sourceLine && (
              <p className="text-sm text-charcoal/60 italic mb-8 border-b border-sage/20 pb-4">
                {post.sourceLine}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-charcoal">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>

            {post.disclaimer && (
              <div className="mt-16 bg-sage-mist/30 p-6 rounded-sm border-l-4 border-gold">
                <p className="text-sm text-charcoal italic font-serif">
                  {post.disclaimer}
                </p>
              </div>
            )}
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}
