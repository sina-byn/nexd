import Link from 'next/link';

// * icons
import { IconCaretRightFilled } from '@tabler/icons-react';

// * components
import Collapse from '../core/Collapse';

// * types
import type { TTableOfContents } from '@/types';

type TableOfContentsMobileProps = { toc: TTableOfContents };

const TableOfContentsMobile = ({ toc }: TableOfContentsMobileProps) => {
  const minLevel = Math.min(...toc.map(h => h[0]));

  if (toc.length === 0) return null;

  const Title = (
    <button type='button' className='flex items-center justify-start gap-x-2'>
      On this page
      <IconCaretRightFilled size={16} />
    </button>
  );

  return (
    <Collapse
      title={Title}
      titleClassName='px-2 py-1 peer-checked:[&_svg]:rotate-90'
      className='mb-4 overflow-hidden rounded-md bg-neutral-400/30 lg:hidden'
    >
      <nav className='prose-ul:m-0 prose-ul:p-2 prose-ul:pt-0 prose-li:m-0 prose-li:p-0'>
        <ul className='m-0 list-none'>
          {toc.map(([depth, id, content]) => (
            <li key={id} style={{ paddingLeft: `${(depth - minLevel) * 12}px` }}>
              <Link href={'#' + id} className='leading-3'>
                {content}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Collapse>
  );
};

export default TableOfContentsMobile;
