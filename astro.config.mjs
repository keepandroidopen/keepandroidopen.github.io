import { defineConfig } from 'astro/config';
import remarkKramdownClasses from './src/plugins/remark-kramdown-classes.mjs';

export default defineConfig({
  site: 'https://keepandroidopen.org',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'es', 'it', 'ko', 'pt-BR', 'cs', 'sk', 'tr', 'uk', 'zh-CN', 'zh-TW'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkKramdownClasses],
  },
});
