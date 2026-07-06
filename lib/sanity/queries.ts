export const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  arm,
  postType,
  publishedAt,
  coverImage
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  arm,
  postType,
  publishedAt,
  coverImage,
  sourceLine,
  disclaimer,
  body
}`;

export const POSTS_BY_ARM_QUERY = `*[_type == "post" && defined(slug.current) && arm == $arm] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  arm,
  postType,
  publishedAt,
  coverImage
}`;
