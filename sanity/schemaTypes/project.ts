import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'videoSrc',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' }
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({
      name: 'btsVideo',
      title: 'Behind the Scenes Video',
      type: 'file',
      options: { accept: 'video/*' }
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
  ]
})
