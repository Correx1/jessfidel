import { defineType, defineField } from "sanity";

export const work = defineType({
  name: "work",
  title: "Our Works",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 2 Weeks, 5 Days, 6 Months",
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt (Short Description)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
    }),

    defineField({
      name: "details",
      title: "Project Details (Key Points)",
      type: "array",
      of: [{ type: "text" }],
    }),

    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
