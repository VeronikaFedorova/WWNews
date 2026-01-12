import { useQuery } from '@tanstack/react-query';
import {
  searchNews,
  type SearchParams,
  type TopHeadlinesResponse,
} from '../services/newsApi';

export function useSearchNews(params: SearchParams, enabled: boolean) {
  return useQuery<TopHeadlinesResponse>({
    queryKey: ['search', params],
    enabled,
    queryFn: ({ signal }) => searchNews(params, signal),
    staleTime: 1000 * 60,
  });
}
