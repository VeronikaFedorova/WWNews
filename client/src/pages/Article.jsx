import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { getArticleById } from '../services/newsApi';
import { cleanArticleContent } from '../helpers/text';

export default function Article() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getArticleById(id)
      .then((res) => setArticle(res.data.article))
      .catch((e) =>
        setError(e.response?.data?.error || 'Failed to load article')
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className='max-w-3xl mx-auto px-4 py-10 animate-pulse'>
        <div className='h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-4' />
        <div className='h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-6' />
        <div className='aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-6' />
        <div className='space-y-3'>
          <div className='h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded' />
          <div className='h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded' />
          <div className='h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto px-4 py-10 text-center'>
        <p className='text-red-600'>{error}</p>
        <Link
          to='/'
          className='inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline'
        >
          <FiArrowLeft /> Back to home
        </Link>
      </div>
    );
  }

  if (!article) return null;

  return (
    <article className='max-w-3xl mx-auto px-4 py-10 text-zinc-700 dark:text-zinc-200'>
      <Link
        to='/'
        className='inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-6'
      >
        <FiArrowLeft /> Back
      </Link>

      <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4'>
        {article.title}
      </h1>

      <div className='flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6'>
        {article.source?.name && <span>{article.source.name}</span>}
        {article.publishedAt && (
          <>
            <span>•</span>
            <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
          </>
        )}
      </div>

      {article.image && (
        <div className='mb-8 overflow-hidden rounded-2xl'>
          <img
            src={article.image}
            alt={article.title}
            className='w-full object-cover'
          />
        </div>
      )}

      <div className='prose prose-zinc dark:prose-invert max-w-none font-bold'>
        {article.content
          ? cleanArticleContent(article.content)
              .split('\n')
              .map((p, i) => <p key={i}>{p}</p>)
          : article.description && <p>{article.description}</p>}
      </div>

      {article.url && (
        <a
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 mt-8 text-blue-600 hover:underline'
        >
          Read original source <FiExternalLink />
        </a>
      )}
    </article>
  );
}
