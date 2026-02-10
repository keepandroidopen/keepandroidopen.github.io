import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
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
    lockdown_banner: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
