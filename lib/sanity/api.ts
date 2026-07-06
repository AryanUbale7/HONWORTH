import { client } from '@/sanity/client';
import { projectId } from '@/sanity/env';
import { ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, POSTS_BY_ARM_QUERY } from './queries';
import { PostListSchema, PostDetailSchema, PostListItem, PostDetail } from './validation';

const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "Understanding Market Volatility",
    slug: "understanding-market-volatility",
    arm: "Creation",
    postType: "Insight",
    publishedAt: new Date().toISOString(),
    coverImage: null,
  },
  {
    _id: "mock-2",
    title: "The Importance of Term Insurance",
    slug: "importance-of-term-insurance",
    arm: "Protection",
    postType: "Insight",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    coverImage: null,
  },
  {
    _id: "mock-3",
    title: "Navigating Succession Planning",
    slug: "navigating-succession-planning",
    arm: "Legacy",
    postType: "News",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    coverImage: null,
  }
];

const MOCK_BODY = [
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "This is a mocked article body. In a real environment, this content would be fetched dynamically from the Sanity CMS and beautifully rendered using Portable Text.", marks: [] }]
  },
  {
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "A Structured Approach", marks: [] }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "We believe in long-term, goal-based investing rather than chasing short term trends. Wealth should be managed with both honour and a deep understanding of its true worth.", marks: [] }]
  }
];

export async function getAllPosts(): Promise<PostListItem[]> {
  // Mock fallback if Sanity is not configured
  if (projectId === 'dummy-project-id') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return PostListSchema.parse(MOCK_POSTS);
  }

  try {
    const data = await client.fetch(ALL_POSTS_QUERY);
    return PostListSchema.parse(data);
  } catch (error) {
    console.error("Failed to fetch or validate all posts:", error);
    throw new Error("Content temporarily unavailable");
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  // Mock fallback if Sanity is not configured
  if (projectId === 'dummy-project-id') {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockPost = MOCK_POSTS.find(p => p.slug === slug);
    if (!mockPost) return null;
    return PostDetailSchema.parse({
      ...mockPost,
      sourceLine: mockPost.postType === 'News' ? "Originally published in The Economic Times (Mock)" : null,
      disclaimer: "This is a mock disclaimer for illustrative purposes.",
      body: MOCK_BODY
    });
  }

  try {
    const data = await client.fetch(POST_BY_SLUG_QUERY, { slug });
    if (!data) return null;
    return PostDetailSchema.parse(data);
  } catch (error) {
    console.error(`Failed to fetch or validate post with slug ${slug}:`, error);
    throw new Error("Content temporarily unavailable");
  }
}

export async function getPostsByArm(arm: "Creation" | "Protection" | "Legacy"): Promise<PostListItem[]> {
  // Mock fallback if Sanity is not configured
  if (projectId === 'dummy-project-id') {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockPosts = MOCK_POSTS.filter(p => p.arm === arm).slice(0, 3);
    return PostListSchema.parse(mockPosts);
  }

  try {
    const data = await client.fetch(POSTS_BY_ARM_QUERY, { arm });
    return PostListSchema.parse(data);
  } catch (error) {
    console.error(`Failed to fetch or validate posts for arm ${arm}:`, error);
    throw new Error("Content temporarily unavailable");
  }
}

