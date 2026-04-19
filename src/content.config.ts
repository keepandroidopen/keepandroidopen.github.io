import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/pages' }),
  schema: z.object({
    title: z.string(),
    lang: z.string(),
    description: z.string(),
    contact_header: z.string().optional(),
    contact_email: z.string().optional(),
    site_problems_header: z.string().optional(),
    site_report_issues: z.string().optional(),
    site_disclaimer: z.string().optional(),
    site_privacy: z.string().optional(),
    site_copyright: z.string().optional(),
    open_letter_cta: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
