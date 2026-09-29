import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://futuresoftly.studio",
  vite: {
    build: {
      // Modern targets keep -webkit-backdrop-filter for Safari alongside the
      // standard property (see the footer in global.css).
      cssTarget: ["chrome111", "edge111", "firefox128", "safari16.4"],
    },
  },
});
