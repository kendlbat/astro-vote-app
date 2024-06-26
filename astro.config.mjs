import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "server",
    integrations: [tailwind(), auth(), react()],
    adapter: node({
        mode: "standalone",
    }),
    experimental: {
        actions: true,
    },
    // origin for proxy
    site: "https://vote.kendlbat.dev",
});
