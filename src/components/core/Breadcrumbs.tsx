import Link from 'next/link';
import { Fragment } from 'react';

// * utils
import { cn } from '@/utils';

// * icons
import { IconChevronRight } from '@tabler/icons-react';

// * types
import type { Breadcrumbs } from '@/utils/breadcrumbs';

type BreadcrumbsProps = { crumbs: Breadcrumbs; className?: string };

const Breadcrumbs = ({ crumbs, className }: BreadcrumbsProps) => {
  return (
    <div
      className={cn(
        'breadcrumbs mb-3 lg:mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm capitalize',
        className,
      )}
    >
      <Link href='/' className='font-medium'>
        Home
      </Link>
      <IconChevronRight size={14} />

      {crumbs.map(({ title, href }, index) => {
        const isLast = index === crumbs.length - 1;

        return isLast ? (
          <span key={title} className='font-medium'>
            {title}
          </span>
        ) : (
          <Fragment key={title}>
            <Link href={href} className='font-medium'>
              {title}
            </Link>
            <IconChevronRight size={14} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
