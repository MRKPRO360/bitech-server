import { z } from 'zod';

const createPrebuiltProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    category: z.string().min(3),
    budget: z.string().min(3),
    status: z.enum(['completed', 'in-progress', 'draft', 'archived']),
    featured: z.boolean(),
    features: z.array(z.string().min(3)),
    shortDescription: z.string().min(3),
    fullDescription: z.string().min(3),
    technologies: z.array(z.string().min(3)),
    results: z
      .object({
        pageLoadTime: z.string().optional(),
        rating: z.string().optional(),
      })
      .optional(),
    images: z
      .object({
        thumbnail: z.string().optional(),
        gallery: z.array(z.string()).optional(),
      })
      .optional(),
    liveLink: z.string().min(3),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const updatePrebuiltProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    category: z.string().min(3).optional(),
    client: z.string().min(3).optional(),
    duration: z.string().min(3).optional(),
    completionDate: z.string().min(3).optional(),
    budget: z.string().min(3).optional(),
    status: z
      .enum(['completed', 'in-progress', 'draft', 'archived'])
      .optional(),
    featured: z.boolean().optional(),
    shortDescription: z.string().min(3).optional(),
    fullDescription: z.string().min(3).optional(),
    technologies: z.array(z.string().min(3)).optional(),
    challenges: z.array(z.string().min(3)).optional(),
    solutions: z.array(z.string().min(3)).optional(),
    results: z
      .object({
        pageLoadTime: z.string().optional(),
        rating: z.string().optional(),
      })
      .optional(),
    images: z
      .object({
        thumbnail: z.string().optional(),
        gallery: z.array(z.string()).optional(),
      })
      .optional(),
    liveLink: z.string().min(3).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const PrebuiltProjectValidationsSchema = {
  createPrebuiltProjectValidationSchema,
  updatePrebuiltProjectValidationSchema,
};
