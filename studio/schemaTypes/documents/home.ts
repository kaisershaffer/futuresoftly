import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      description: "One entry per paragraph under the title.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "phrases",
      description: "The F. S. phrases listed down the page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "signoff",
      description: "Closing paragraphs. Line breaks are kept.",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 5 })],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
  ],
});
