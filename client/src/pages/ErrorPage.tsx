import { Link, useRouteError } from 'react-router-dom';

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError | unknown;

  console.error(error);

  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error as RouteError).status ?? 500
      : 500;

  const title = status === 404 ? 'Page not found' : 'Something went wrong';
  const description =
    status === 404
      ? 'The page you’re looking for doesn’t exist or was moved.'
      : 'An unexpected error occurred. Please try again later.';

  return (
    <div className='min-h-screen flex items-center justify-center px-6 bg-zinc-50 dark:bg-zinc-950'>
      <div className='w-full max-w-md text-center flex flex-col gap-4'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-500'>
          <span className='text-2xl font-semibold'>{status}</span>
        </div>

        <h1 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2'>
          {title}
        </h1>

        <p className='text-sm text-zinc-600 dark:text-zinc-400 mb-8'>
          {description}
        </p>

        <div className='flex items-center justify-center gap-3'>
          <Link
            to='/'
            className='
              inline-flex items-center justify-center
              rounded-lg bg-blue-500 px-4 py-2
              text-sm font-medium text-white
              hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            '
          >
            Go home
          </Link>

          <button
            type='button'
            onClick={() => window.location.reload()}
            className='
              inline-flex items-center justify-center
              rounded-lg border border-zinc-300 px-4 py-2
              text-sm font-medium text-zinc-700
              hover:bg-zinc-100
              dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800
            '
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
