import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Enable TypeScript checking
  typescript: {
    strict: true,
  },
  // Build output directory
  outDir: "./dist",
  // Site configuration
  site: process.env.SITE_URL || "https://example.com",
});
