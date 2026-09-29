import { defineQuery } from "groq";
import { sanityClient } from "./sanity";

export interface Home {
  title: string;
  tagline: string[];
  phrases: string[];
  signoff: string[];
  instagramUrl?: string;
}

export interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  year?: number;
}

export interface Project extends ProjectSummary {
  disciplines?: string[];
  summary?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
}

// What the site shows before Sanity has content (matches the original page).
const FALLBACK_HOME: Home = {
  title: "Future Softly",
  tagline: ["A visual practice for brand, digital, and print design.", "Newness with gentleness."],
  phrases: [
    "Fake Self",
    "Fellow Seeker",
    "Fear Sons",
    "First Sight",
    "Form Sign",
    "Freaky Sacred",
    "Feel Seen",
    "Final Saint",
    "Felt Stir",
    "Focus Short",
  ],
  signoff: ["fuuuuuuu\ntuuuuuuu\nreeeeeee\nsooooooo\nftlyyyyyyy", "est. 2024"],
  instagramUrl: "https://www.instagram.com/futuresoftly.studio",
};

const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  title, tagline, phrases, signoff, instagramUrl
}`);

const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(year desc, title asc){ _id, title, "slug": slug.current, year }`);

const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, year, disciplines, summary, coverImage
}`);

export async function getHome(): Promise<Home> {
  if (!sanityClient) return FALLBACK_HOME;
  const home = await sanityClient.fetch<Partial<Home> | null>(HOME_QUERY);
  return { ...FALLBACK_HOME, ...stripNulls(home) };
}

export async function getProjects(): Promise<ProjectSummary[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<ProjectSummary[]>(PROJECTS_QUERY);
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<Project | null>(PROJECT_QUERY, { slug });
}

function stripNulls<T extends object>(obj: T | null): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null)) as Partial<T>;
}
