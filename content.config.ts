import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// content/projects/<slug>.md-এর frontmatter-এর গঠন (ধাপ ৩-এ নমুনা ফাইল আসবে)
export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.enum(['education', 'food', 'clothing', 'disaster', 'environment', 'selfreliance']),
        categoryLabel: z.string(),
        status: z.enum(['ongoing', 'completed']),
        statusLabel: z.string(),
        date: z.string(),
        location: z.string(),
        beneficiaries: z.string(), // বাংলা অঙ্কে লেখা যায়, তাই string
        summary: z.string(),
        goal: z.string(),
        outcomes: z.array(z.string()),
        cover: z.string().optional(),
        gallery: z.array(z.string()).default([]),
        team: z.array(z.string()).default([]),
        // তালিকার ক্রম ও আগের/পরের প্রকল্পের জন্য (ছোট সংখ্যা আগে)
        order: z.number().default(0),
        // true হলে হোমের "আমাদের কাজ" carousel-এ আসে
        featured: z.boolean().default(false),
      }),
    }),
  },
})
