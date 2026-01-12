import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useCategories } from '../hooks/useCategories';
import type { Category } from '../services/newsApi';

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  const [query, setQuery] = useState<string>('');

  const [params] = useSearchParams();
  const activeCategory = (params.get('category') || 'general') as Category;

  const navigate = useNavigate();

  const { data } = useCategories();
  const categories = useMemo(() => data?.categories ?? [], [data]);

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const cleaned = query.trim();
    if (!cleaned) return;

    navigate(`/search?q=${encodeURIComponent(cleaned)}`);
    setQuery('');
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className='fixed inset-0 z-40 bg-black/40' onClick={onClose} />

      <aside className='fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 shadow-xl flex flex-col'>
        <div className='flex items-center justify-between px-4 py-4 border-b dark:border-zinc-800'>
          <h2 className='text-lg font-semibold'>Menu</h2>
          <button
            type='button'
            onClick={onClose}
            className='p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800'
            aria-label='Close menu'
          >
            <FiX />
          </button>
        </div>

        <form
          onSubmit={onSearchSubmit}
          className='px-4 py-3 border-b dark:border-zinc-800'
        >
          <div className='relative'>
            <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400' />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search news...'
              className='w-full pl-9 pr-3 py-2 rounded-lg text-sm border border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700'
            />
          </div>
        </form>

        <nav className='flex-1 overflow-y-auto px-2 py-3'>
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type='button'
                onClick={() => {
                  navigate(`/?category=${category}`);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg capitalize transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
