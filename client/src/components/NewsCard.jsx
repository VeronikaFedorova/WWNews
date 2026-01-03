import { Link } from 'react-router-dom';

export default function NewsCard({ article, variant = 'small' }) {
  const isLarge = variant === 'large';

  if (!isLarge) {
    return (
      <article className='col-span-1 my-4 sm:my-0'>
        <Link
          to={`/article/${article.id}`}
          className='group relative block aspect-square overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800'
        >
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-zinc-400'>
              No image
            </div>
          )}

          <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />

          <div className='absolute inset-x-0 bottom-0 p-3'>
            <h3 className='text-lg font-semibold text-white leading-snug line-clamp-2'>
              {article.title}
            </h3>

            <div className='mt-1 text-[11px] text-zinc-300'>
              {article.source?.name}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className='col-span-2 group overflow-hidden rounded-xl bg-white dark:bg-zinc-950 hover:shadow-lg transition flex flex-col my-4 sm:my-0'>
      <Link to={`/article/${article.id}`}>
        <div className='relative aspect-square w-full bg-zinc-200 dark:bg-zinc-800'>
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-zinc-400'>
              No image
            </div>
          )}
        </div>
      </Link>

      <div className='p-4 flex flex-col gap-2'>
        <Link to={`/article/${article.id}`}>
          <h3 className='text-lg font-semibold text-zinc-950 dark:text-zinc-100 line-clamp-2'>
            {article.title}
          </h3>
        </Link>

        {article.description && (
          <p className='text-lg text-zinc-600 dark:text-zinc-400 line-clamp-3'>
            {article.description}
          </p>
        )}

        <div className='mt-auto text-xs text-zinc-500 dark:text-zinc-400'>
          {article.source?.name}
          {article.publishedAt && (
            <>
              {' • '}
              {new Date(article.publishedAt).toLocaleDateString()}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
