import React from 'react';
import { Section } from './Section';
import { Button } from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/image';
import { PostListItem } from '@/lib/sanity/validation';

export interface ArmPageLayoutProps {
  title: string;
  headline: string;
  descriptionText1: string;
  subheading?: string;
  descriptionText2: string;
  disclaimer?: string;
  armTag: "Creation" | "Protection" | "Legacy";
  icon: React.ReactNode;
  features: {
    icon: React.ReactNode;
    label: string;
  }[];
  relatedPosts: PostListItem[];
  children?: React.ReactNode;
}

export const ArmPageLayout: React.FC<ArmPageLayoutProps> = ({
  title,
  headline,
  descriptionText1,
  subheading,
  descriptionText2,
  disclaimer,
  armTag,
  icon,
  features,
  relatedPosts,
  children
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Page Hero */}
      <Section bgColor="sage-mist" className="border-b border-sage/20 py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="text-gold mb-6 bg-white p-4 rounded-full shadow-sm">
            {icon}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-deep-green mb-6 leading-tight">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl">
            {descriptionText1}
          </p>
        </div>
      </Section>

      {/* 2. Philosophy Split & Features Row */}
      <Section bgColor="white" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          
          <div className="text-center max-w-3xl mx-auto">
            {subheading && (
              <h2 className="font-serif text-2xl md:text-3xl text-deep-green mb-4">{subheading}</h2>
            )}
            <p className="text-lg text-charcoal leading-relaxed">{descriptionText2}</p>
          </div>

          {/* 3. Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-sage-mist">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4 p-6">
                <div className="text-deep-green">
                  {feature.icon}
                </div>
                <h3 className="font-sans font-medium text-lg text-deep-green">{feature.label}</h3>
              </div>
            ))}
          </div>

          {/* Extra children blocks if any */}
          {children && (
            <div className="flex flex-col gap-12">
              {children}
            </div>
          )}

          {/* 4. Disclaimer Card */}
          {disclaimer && (
            <div className="bg-sage-mist/50 p-6 rounded-lg border-l-4 border-gold shadow-sm mt-8 max-w-3xl mx-auto">
              <p className="text-sm text-charcoal/80 italic leading-relaxed">{disclaimer}</p>
            </div>
          )}
          
        </div>
      </Section>

      {/* 5. Related Insights */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Section bgColor="sage-mist" className="py-16 md:py-24 border-t border-sage/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-deep-green mb-10 text-center">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {relatedPosts.map((post) => (
                <Link key={post._id} href={`/insights/${post.slug}`} className="group flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {post.coverImage && (
                    <div className="aspect-[4/3] w-full bg-sage-mist overflow-hidden">
                      <Image
                        src={urlForImage(post.coverImage)?.url() || ""}
                        alt={post.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs uppercase tracking-wider font-semibold text-deep-green bg-sage-mist px-2 py-1 rounded-sm">{post.arm}</span>
                      <span className="text-xs uppercase tracking-wider text-charcoal/60">{post.postType}</span>
                    </div>
                    <h3 className="font-serif text-xl text-deep-green mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    <time className="text-sm text-charcoal/60 mt-auto pt-4">
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 6. CTA Section */}
      <Section bgColor="sage-mist" className="border-t border-sage/20 text-center py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-deep-green mb-6">Ready to discuss your family's future?</h2>
        <p className="text-charcoal/80 mb-8 max-w-lg mx-auto">
          Start a conversation with our team to see how our structured principles can apply to your unique situation, or learn more about <Link href="/our-approach" className="text-gold hover:underline underline-offset-4 font-medium transition-colors">our approach</Link> to wealth management.
        </p>
        <Link href="/contact">
          <Button variant="primary" className="px-8 py-3">
            Start a conversation
          </Button>
        </Link>
      </Section>

    </div>
  );
};
