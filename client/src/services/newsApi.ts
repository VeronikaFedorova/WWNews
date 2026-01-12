import { api } from './api';
import { parseOrThrow } from '../validation/parse';
import {
  CategoriesResponseSchema,
  TopHeadlinesResponseSchema,
  ArticleResponseSchema,
  type Category,
  type TopHeadlinesResponse,
  type CategoriesResponse,
  type ArticleResponse,
  CATEGORIES,
} from '../validation/newsSchemas';

export { CATEGORIES };
export type {
  Category,
  TopHeadlinesResponse,
  CategoriesResponse,
  ArticleResponse,
};

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

export type TopHeadlinesParams = {
  category?: Category;
  q?: string;
  lang?: string;
  max?: number;
  page?: number;
};

export type SearchParams = {
  q: string;
  lang?: string;
  max?: number;
  page?: number;
  sortby?: string;
  in?: string;
  from?: string;
  to?: string;
  nullable?: string;
  truncate?: string;
};

export async function searchNews(
  params: SearchParams,
  signal?: AbortSignal
): Promise<TopHeadlinesResponse> {
  const res = await api.get('/search', { params, signal });
  return parseOrThrow(TopHeadlinesResponseSchema, res.data, 'search');
}

export async function getCategories(
  signal?: AbortSignal
): Promise<CategoriesResponse> {
  const res = await api.get('/categories', { signal });
  return parseOrThrow(CategoriesResponseSchema, res.data, 'categories');
}

export async function getTopHeadlines(
  params: TopHeadlinesParams,
  signal?: AbortSignal
): Promise<TopHeadlinesResponse> {
  const res = await api.get('/news', { params, signal });
  return parseOrThrow(TopHeadlinesResponseSchema, res.data, 'top headlines');
}

export async function getArticleById(
  id: string,
  signal?: AbortSignal
): Promise<ArticleResponse> {
  const res = await api.get(`/article/${id}`, { signal });
  return parseOrThrow(ArticleResponseSchema, res.data, 'article');
}
