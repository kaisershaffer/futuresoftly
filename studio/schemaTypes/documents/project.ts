import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: "disciplines",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Brand", value: "brand" },
          { title: "Digital", value: "digital" },
          { title: "Print", value: "print" },
        ],
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "coverImage" },
  },
});
