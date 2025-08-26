import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Enable TypeScript checking
  vite: {
    ssr: {
      noExternal: ["contentful"],
    },
  },
});
