import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import NewsList from '../components/NewsList';
import { useSearchNews } from '../hooks/useSearchNews';
import type { Article } from '../types/news';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') || '';
  const lang = params.get('lang') || 'en';

  const [query, setQuery] = useState(initialQ);
  const [debounced, setDebounced] = useState(initialQ);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  const cleaned = useMemo(() => debounced.trim(), [debounced]);
  const canSearch = cleaned.length >= 2;

  useEffect(() => {
    if (!canSearch) {
      if (params.get('q')) {
        setParams(lang ? { lang } : {}, { replace: true });
      }
      return;
    }

    const next: Record<string, string> = { q: cleaned };
    if (lang) next.lang = lang;

    if (params.get('q') !== cleaned || params.get('lang') !== lang) {
      setParams(next, { replace: true });
    }
  }, [canSearch, cleaned, lang, setParams]);

  const { data, isFetching, error } = useSearchNews(
    {
      q: cleaned,
      max: 12,
      page: 1,
      lang,
    },
    canSearch
  );

  const articles: Article[] = data?.articles ?? [];

  const clear = () => {
    setQuery('');
    setDebounced('');
    setParams(lang ? { lang } : {}, { replace: true });
  };

  return (
    <div className='min-h-[calc(100vh-64px)]'>
      <div className='max-w-6xl mx-auto px-4 py-6 sm:py-10'>
        <div className='flex flex-col gap-5 sm:gap-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100'>
              Search
            </h1>
            <p className='text-sm sm:text-base text-zinc-600 dark:text-zinc-400'>
              Find world-wide news by keywords. Start typing to see results.
            </p>
          </div>

          <div className='sticky top-0 z-10 -mx-4 px-4 py-3 backdrop-blur'>
            <div className='relative w-full max-w-2xl'>
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search world news…'
                className='w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-11 py-3 text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none focus:border-zinc-300 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-blue-400/10'
              />
              {query.length > 0 && (
                <button
                  type='button'
                  onClick={clear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                  aria-label='Clear search'
                >
                  <FiX className='h-5 w-5' />
                </button>
              )}
            </div>
          </div>

          {error instanceof Error && (
            <div className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300'>
              {error.message || 'Search failed'}
            </div>
          )}

          {canSearch &&
            !isFetching &&
            !(error instanceof Error) &&
            (articles.length ? (
              <div className='mt-1'>
                <NewsList articles={articles} />
              </div>
            ) : (
              <div className='rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 text-center text-sm sm:text-base text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'>
                No articles found for{' '}
                <span className='font-semibold text-zinc-900 dark:text-zinc-100'>
                  “{cleaned}”
                </span>
                .
              </div>
            ))}

          {canSearch && isFetching && !(error instanceof Error) && (
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className='rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm'
                >
                  <div className='aspect-square bg-zinc-200 dark:bg-zinc-800 animate-pulse' />
                  <div className='p-4 space-y-2'>
                    <div className='h-3 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
                    <div className='h-3 w-3/5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
                    <div className='h-3 w-2/5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
