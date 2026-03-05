import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g., Luxury Dental UX)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study Details',
      type: 'object',
      fields: [
        {name: 'overview', title: 'Overview', type: 'text'},
        {name: 'challenges', title: 'Challenges', type: 'array', of: [{type: 'string'}]},
        {name: 'solutions', title: 'Solutions', type: 'array', of: [{type: 'string'}]},
        {name: 'results', title: 'Results', type: 'array', of: [{type: 'string'}]},
      ],
    }),
  ],
})
