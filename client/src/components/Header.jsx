import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FiMenu } from 'react-icons/fi';

export default function Header({ onOpenMenu }) {
  return (
    <header className='border-b bg-white dark:bg-zinc-900 dark:border-zinc-800'>
      <div className='px-4 py-4 flex items-center'>
        <button
          onClick={onOpenMenu}
          className='p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
          aria-label='Open menu'
        >
          <FiMenu className='h-6 w-6' />
        </button>
        <Link to='/' className='flex items-center gap-2 mx-auto'>
          <img
            src={logo}
            alt='WWNews'
            className='h-10 w-30 md:h-20 md:w-50 lg:h-30 lg:w-80'
          />
        </Link>
      </div>
    </header>
  );
}
