import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTopHeadlines } from '../services/newsApi';
import NewsList from '../components/NewsList';

export default function Home() {
  const [params] = useSearchParams();
  const category = params.get('category') || 'general';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getTopHeadlines({ category, max: 12, page: 1 })
      .then((res) => setArticles(res.data.articles || []))
      .catch((e) => setError(e.response?.data?.error || 'Failed to load news'))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className='text-red-600'>{error}</p>;

  return <NewsList articles={articles} />;
}
