'use client';

// * context
import { useSearch } from './SearchContext';

// * icons
import { IconSearch } from '@tabler/icons-react';

// * types
type SearchButtonProps = { os?: string };

const SearchButton = ({ os }: SearchButtonProps) => {
  const normalizedOS = os?.replace(/\s/g, '-').toLowerCase();
  const { setOpen } = useSearch();

  const clickHandler = () => setOpen(true);

  return (
    <button
      type='button'
      onClick={clickHandler}
      className='flex items-center gap-x-10 rounded-full bg-neutral p-2 lg:p-1.5 text-sm hover:bg-neutral-light md:rounded-md'
    >
      <IconSearch size={20} className='text-neutral-lighter lg:hidden' />

      <span className='hidden text-neutral-lighter md:inline'>Search documentation...</span>

      <kbd className='border-button hidden items-center rounded border bg-background px-1.5 py-0.5 text-xs md:flex'>
        <kbd>{normalizedOS === 'mac-os' ? '⌘' : 'Ctrl'}</kbd>
        &nbsp;
        <kbd>K</kbd>
      </kbd>
    </button>
  );
};

export default SearchButton;
