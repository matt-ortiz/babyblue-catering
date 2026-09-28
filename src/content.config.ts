import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // page H1 + card title
      seoTitle: z.string(), // <title>, ~60 chars, keyword + location
      description: z.string(), // meta description, ~150 chars
      category: z.enum(['in-home', 'events', 'chef', 'corporate']),
      order: z.number().default(0),
      featured: z.boolean().default(false),
      eyebrow: z.string(),
      lead: z.string(),
      cardBlurb: z.string(),
      image: image(),
      imageAlt: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      price: z
        .object({
          from: z.number().optional(),
          unit: z.string().optional(), // "per guest", "for two"...
          label: z.string().optional(), // override e.g. "Custom quote"
        })
        .default({}),
      minimumGuests: z.number().optional(),
      maximumGuests: z.number().optional(),
      occasions: z.array(z.string()).default([]),
      includesTitle: z.string().default("What's included"),
      includes: z.array(z.string()).default([]),
      tiers: z
        .array(
          z.object({
            name: z.string(),
            price: z.number().optional(),
            unit: z.string().optional(),
            summary: z.string(),
            includes: z.array(z.string()),
          }),
        )
        .default([]),
      addOns: z
        .array(
          z.object({
            name: z.string(),
            price: z.number().optional(),
            unit: z.string().optional(),
            summary: z.string(),
            includes: z.array(z.string()).default([]),
          }),
        )
        .default([]),
      showBeverages: z.boolean().default(false),
      menus: z.array(reference('menus')).default([]),
      terms: z.string().optional(),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      related: z.array(z.string()).default([]),
    }),
});

const menus = defineCollection({
  loader: file('./src/content/menus.json'),
  schema: z.object({
    title: z.string(),
    hosts: z.string(),
    style: z.string(),
    guests: z.number(),
    courses: z.array(
      z.object({
        name: z.string(),
        items: z.array(z.object({ name: z.string(), description: z.string().optional() })),
      }),
    ),
    note: z.string().optional(),
  }),
});

export const collections = { services, menus };
