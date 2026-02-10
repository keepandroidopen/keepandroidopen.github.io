import { defineConfig } from 'astro/config';
import remarkKramdownClasses from './src/plugins/remark-kramdown-classes.mjs';
import { remarkHeadingId } from "remark-custom-heading-id";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from "rehype-external-links";
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://keepandroidopen.org',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'es', 'it', 'ko', 'pt-BR', 'cs', 'sk', 'tr', 'uk', 'zh-CN', 'zh-TW'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [yaml()]
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  markdown: {
    remarkPlugins: [remarkHeadingId, remarkKramdownClasses],
    rehypePlugins: [[rehypeExternalLinks, {
      target: "_blank",
      content: {
        type: "text",
        value: " ↗"
      }
    }]
    ],
  },
});
