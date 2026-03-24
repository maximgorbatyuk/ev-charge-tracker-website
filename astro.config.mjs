// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://evchargetracker.app',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ru', 'tr', 'uk', 'kk', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          de: 'de-DE',
          ru: 'ru-RU',
          tr: 'tr-TR',
          uk: 'uk-UA',
          kk: 'kk-KZ',
          zh: 'zh-CN',
        },
      },
    }),
  ],
});
