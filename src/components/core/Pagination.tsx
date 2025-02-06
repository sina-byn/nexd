import Link from 'next/link';

// * utils
import { extractPagination } from '@/utils/pagination';

// * icons
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// * types
import type { SidebarTree } from '@/utils/sidebar';

type PaginationProps = { sidebarTree: SidebarTree; pagePath: string };

const Pagination = ({ sidebarTree, pagePath }: PaginationProps) => {
  const pagination = extractPagination(sidebarTree, pagePath);
  const [prevPage, nextPage] = pagination;

  return (
    <footer className='grid grid-cols-2 gap-4 capitalize mt-10'>
      {prevPage.href && (
        <div className='group flex'>
          <Link href={prevPage.href} className='flex w-fit items-end gap-x-1'>
            <IconChevronLeft className='size-4 text-neutral lg:size-6' />

            <div className='-mb-0.5 flex flex-col text-lg'>
              <span className='text-xs text-neutral lg:text-sm'>previous</span>
              <span className='text-sm font-medium text-foreground lg:text-base'>
                {prevPage.title}
              </span>
            </div>
          </Link>
        </div>
      )}

      {nextPage.href && (
        <div className='group col-start-2 flex justify-end'>
          <Link href={nextPage.href} className='prose flex w-fit items-end gap-x-1'>
            <div className='-mb-0.5 flex flex-col text-lg'>
              <span className='text-xs text-neutral lg:text-sm'>next</span>
              <span className='text-sm font-medium text-foreground lg:text-base'>
                {nextPage.title}
              </span>
            </div>

            <IconChevronRight className='size-4 text-neutral lg:size-6' />
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Pagination;
