import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

// Null until a Sanity project is configured, so the site still builds
// from the fallback content in ./content.ts.
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-09-01",
      useCdn: false, // static builds read fresh content at build time
    })
  : null;

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]) {
  if (!sanityClient) throw new Error("Sanity is not configured");
  return imageUrlBuilder(sanityClient).image(source);
}
