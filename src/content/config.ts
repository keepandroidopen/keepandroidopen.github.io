import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.string(),
    description: z.string(),
    contact_header: z.string(),
    contact_email: z.string(),
    site_problems_header: z.string(),
    site_report_issues: z.string(),
    site_disclaimer: z.string(),
    site_privacy: z.string(),
    site_copyright: z.string(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
