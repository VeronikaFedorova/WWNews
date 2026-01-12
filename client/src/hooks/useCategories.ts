import { useQuery } from '@tanstack/react-query';
import { getCategories, type CategoriesResponse } from '../services/newsApi';

export function useCategories() {
  return useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 1000 * 60 * 30,
  });
}
