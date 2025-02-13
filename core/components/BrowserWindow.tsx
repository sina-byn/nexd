// * utils
import { cn } from '@/core/utils';

// * icons
import { IconMenu2 } from '@tabler/icons-react';

// * types
export type BrowserWindowProps = { title?: string; className?: string; children: React.ReactNode };

const BrowserWindow = ({ title, className, children }: BrowserWindowProps) => {
  return (
    <section className={cn('my-6 prose-p:m-0 prose-a:m-0', className)}>
      <header className='flex shrink-0 items-center gap-x-4 rounded-t-md bg-neutral px-4 py-2'>
        <div className='flex items-center gap-x-2'>
          <div className='circle size-3 rounded-full bg-red-500' />
          <div className='circle size-3 rounded-full bg-orange-400' />
          <div className='circle size-3 rounded-full bg-green-400' />
        </div>

        <div className='search-bar grow truncate rounded-3xl bg-background px-4 py-1 text-sm'>
          {title ?? 'http://localhost:3000'}
        </div>

        <IconMenu2 className='shrink-0' />
      </header>

      <div className='rounded-b-md border-x-2 border-b-2 border-neutral-400/20 p-4'>{children}</div>
    </section>
  );
};

export default BrowserWindow;
