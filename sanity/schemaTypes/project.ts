// sanity/schemaTypes/project.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Social Media Marketing', value: 'social-media-marketing'},
          {title: 'SEO', value: 'seo'},
          {title: 'Business Consultation', value: 'business-consultation'},
          {title: 'PPC Advertising', value: 'ppc'},
          {title: 'Branding and Design', value: 'branding-and-design'},
          {title: 'Web Design and Development', value: 'web-design-and-development'},
        ],
      },
    }),
    defineField({
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
      description: 'Leave empty or set future date for ongoing projects',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Tool Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Tool Icon/Logo',
              type: 'image',
              description: 'Upload the logo or icon for this tool (optional)',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon',
            },
          },
        },
      ],
      description: 'List of tools, technologies, or platforms used in this project with optional icons',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Live website link (if applicable)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const {client} = selection
      return {...selection, subtitle: client && `Client: ${client}`}
    },
  },
})