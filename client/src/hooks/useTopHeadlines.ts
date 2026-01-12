import { useQuery } from '@tanstack/react-query';
import {
  getTopHeadlines,
  type TopHeadlinesParams,
  type TopHeadlinesResponse,
} from '../services/newsApi';

export function useTopHeadlines(params: TopHeadlinesParams) {
  return useQuery<TopHeadlinesResponse>({
    queryKey: ['topHeadlines', params],
    queryFn: ({ signal }) => getTopHeadlines(params, signal),
    staleTime: 1000 * 60 * 5,
  });
}
