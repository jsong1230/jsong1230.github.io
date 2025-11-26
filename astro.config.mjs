// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    tailwind(), 
    mdx(),
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'ko',
        locales: {
          ko: 'ko-KR',
          en: 'en-US',
        },
      },
    }),
  ],
  output: 'static',
  site: 'https://jsong1230.github.io',
  base: '/',
});



