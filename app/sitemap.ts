import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://honworth.in';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/our-approach',
    '/wealth-creation',
    '/wealth-protection',
    '/wealth-legacy',
    '/insights',
    '/disclaimer',
    '/privacy-policy',
    '/disclosures',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Try fetching dynamic routes, fallback gracefully if sanity isn't configured
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch(ALL_POSTS_QUERY);
    if (posts && Array.isArray(posts)) {
      dynamicRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/insights/${post.slug}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.warn("Could not fetch Sanity posts for sitemap, returning static routes only.");
  }

  return [...staticRoutes, ...dynamicRoutes];
}
