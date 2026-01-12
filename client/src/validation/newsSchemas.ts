import { z } from 'zod';

export const CATEGORIES = [
  'general',
  'world',
  'nation',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
] as const;

export const CategorySchema = z.enum(CATEGORIES);

export const ArticleSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    url: z.string().url(),
    image: z.string().url().nullable().optional(),
    publishedAt: z.string(),
    source: z
      .object({
        name: z.string().optional(),
        url: z.string().url().optional(),
      })
      .optional(),
  })
  .passthrough();

export const TopHeadlinesResponseSchema = z
  .object({
    totalArticles: z.number().optional(),
    articles: z.array(ArticleSchema),
  })
  .passthrough();

export const CategoriesResponseSchema = z
  .object({
    categories: z.array(CategorySchema),
    default: CategorySchema,
  })
  .passthrough();

export const ArticleResponseSchema = z
  .object({
    article: ArticleSchema,
  })
  .passthrough();

export type Category = z.infer<typeof CategorySchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type TopHeadlinesResponse = z.infer<typeof TopHeadlinesResponseSchema>;
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
