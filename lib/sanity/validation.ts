import { z } from 'zod';

export const PostListSchema = z.array(
  z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    arm: z.enum(['Creation', 'Protection', 'Legacy']),
    postType: z.enum(['Insight', 'News']),
    publishedAt: z.string(),
    coverImage: z.any().nullable().optional(),
  })
);

export const PostDetailSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  arm: z.enum(['Creation', 'Protection', 'Legacy']),
  postType: z.enum(['Insight', 'News']),
  publishedAt: z.string(),
  coverImage: z.any().nullable().optional(),
  sourceLine: z.string().nullable().optional(),
  disclaimer: z.string().nullable().optional(),
  body: z.any(), // portable text array
});

export type PostListItem = z.infer<typeof PostListSchema>[number];
export type PostDetail = z.infer<typeof PostDetailSchema>;
