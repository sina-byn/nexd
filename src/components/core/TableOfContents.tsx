'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

// * utils
import { cn } from '@/utils';

// * types
import type { TTableOfContents } from '@/types';

type TableOfContentsProps = { toc: TTableOfContents };

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const minLevel = Math.min(...toc.map(h => h[0]));

  useEffect(() => {
    const sections = toc.map(([_, id]) => document.getElementById(id));

    const scrollHandler = () => {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (
          !section ||
          section.offsetTop < window.scrollY ||
          section.offsetTop > window.scrollY + window.innerHeight
        ) {
          continue;
        }

        setActiveIndex(i);
        return;
      }
    };

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className='hidden h-fit overflow-hidden p-4 lg:block'>
      <ul className='space-y-2 text-sm'>
        {toc.map(([depth, id, content], index) => (
          <li key={id} className='truncate'>
            <Link
              href={'#' + id}
              onClick={setActiveIndex.bind(null, index)}
              style={{ marginLeft: `${(depth - minLevel) * 12}px` }}
              className={cn(index === activeIndex ? 'text-primary' : 'opacity-75')}
            >
              {content}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
