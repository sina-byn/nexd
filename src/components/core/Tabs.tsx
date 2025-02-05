'use client';

import { useState, Children, type HTMLAttributes } from 'react';

// * utils
import { cn } from '@/utils';

// * types
type TabsProps = HTMLAttributes<HTMLElement> & { labels: string[]; children: React.ReactNode };

const Tabs = ({ labels, children, className, ...props }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <article className={cn('tabs mt-6', className)} {...props}>
      <header className='border-default inline-flex overflow-hidden rounded-t-md border border-b-0'>
        {labels.map((label, index) => (
          <button
            key={label}
            type='button'
            onClick={setActiveTabIndex.bind(null, index)}
            className={cn(
              'border-default border-r p-2 text-sm last:border-r-0',
              index === activeTabIndex ? 'bg-neutral-400/30' : 'dark:bg-neutral-dark',
            )}
          >
            {label}
          </button>
        ))}
      </header>

      <div>
        {Children.map(children, (child, index) => (
          <div
            key={index}
            className={cn(
              'tab [&_figcaption.header]:!rounded-tl-none',
              index !== activeTabIndex && 'hidden',
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </article>
  );
};

export default Tabs;
