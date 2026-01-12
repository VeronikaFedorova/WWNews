import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row justify-between'>
      <div className='max-w-6xl w-auto sm:w-[80vw] mx-auto px-4 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500 dark:text-zinc-400'>
        <span>© {year} WWNews</span>

        <div className='flex items-center gap-4'>
          <Link to='/' className='hover:text-zinc-900 dark:hover:text-zinc-100'>
            Home
          </Link>
          <a
            href='https://gnews.io'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-zinc-900 dark:hover:text-zinc-100'
          >
            Data by GNews
          </a>
        </div>
      </div>
    </footer>
  );
}
