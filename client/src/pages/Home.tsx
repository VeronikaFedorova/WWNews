import { useSearchParams } from 'react-router-dom';
import NewsList from '../components/NewsList';
import { useTopHeadlines } from '../hooks/useTopHeadlines';
import { isCategory } from '../services/newsApi';

export default function Home() {
  const [params] = useSearchParams();
  const categoryParam = params.get('category');
  const category =
    categoryParam && isCategory(categoryParam) ? categoryParam : 'general';

  const { data, isLoading, error } = useTopHeadlines({
    category,
    max: 12,
    page: 1,
  });

  if (isLoading) return <p>Loading…</p>;

  if (error instanceof Error) {
    return (
      <p className='text-red-600'>{error.message || 'Failed to load news'}</p>
    );
  }

  return <NewsList articles={data?.articles ?? []} />;
}
