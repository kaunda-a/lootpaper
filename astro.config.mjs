// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://lootpaper.com",
  output: "static",

  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },

  integrations: [react(), sitemap()],
});
