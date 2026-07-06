import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'arm',
      title: 'Wealth Arm',
      type: 'string',
      options: {
        list: [
          { title: 'Wealth Creation', value: 'Creation' },
          { title: 'Wealth Protection', value: 'Protection' },
          { title: 'Wealth Legacy', value: 'Legacy' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Insight', value: 'Insight' },
          { title: 'News', value: 'News' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sourceLine',
      title: 'Source Line (News only)',
      type: 'string',
      description: 'E.g., Originally published in The Economic Times',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Custom Disclaimer',
      type: 'text',
      description: 'Optional inline disclaimer text for this post',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
