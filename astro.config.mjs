// @ts-check
import { defineConfig, envField } from 'astro/config';

import svelte from '@astrojs/svelte';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  env: {
    schema: {
      DIRECTUS_URL: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      DIRECTUS_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      })
    }
  }
});