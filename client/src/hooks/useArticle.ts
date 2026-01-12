import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '../services/newsApi';
import type { Article } from '../validation/newsSchemas';

export function useArticle(id: string | undefined) {
  return useQuery<Article>({
    queryKey: ['article', id],
    enabled: !!id,
    queryFn: ({ signal }) =>
      getArticleById(id as string, signal).then((response) => response.article),
    staleTime: 1000 * 60 * 10,
  });
}
