import fs from 'fs';

import Link from 'next/link';

// * fast-glob
import { globSync as fg } from 'fast-glob';

// * utils
import { docPathname } from '@/core/utils/path';
import { extractFrontmatter } from '@/core/utils/mdx';

// * icons
import { IconArrowUpRight, IconCaretRightFilled } from '@tabler/icons-react';

// * components
import Collapse from '../Collapse';
import ImgAltButton from './ImgAltButton';

// * types
type DocPageItemProps = { title: string };

const DocPageItem = ({ title }: DocPageItemProps) => {
  return (
    <button
      type='button'
      className='grid select-none grid-cols-[1fr_auto] items-center gap-x-2 overflow-hidden px-3 py-1'
    >
      <p className='truncate font-medium capitalize'>{title}</p>
      <IconCaretRightFilled size={14} />
    </button>
  );
};

const DevModePopover = () => {
  const docs = fg('./src/docs/**/page.mdx', { absolute: true });

  return (
    <>
      <div className='absolute bottom-full right-0 -mr-2 mb-12 max-h-96 w-80 overflow-y-auto rounded-md bg-[#1c1c1e] py-2'>
        <ImgAltButton />

        <div>
          {docs.map(async doc => {
            const mdx = fs.readFileSync(doc, 'utf-8');
            const frontmatter = await extractFrontmatter(mdx);
            const title = frontmatter.label ?? frontmatter.title ?? doc.split('/').at(-2);
            const pathname = docPathname(doc);

            return (
              <Collapse
                title={<DocPageItem title={title} />}
                className='border-b border-white/10'
                titleClassName='peer-checked:[&_svg]:rotate-90'
              >
                <div className='px-3 pb-3'>
                  <ul className='grid space-y-2'>
                    <li>
                      <Link
                        href={pathname}
                        style={{ wordBreak: 'break-all' }}
                        className='flex font-medium text-primary underline'
                      >
                        {pathname}
                        <IconArrowUpRight size={16} stroke={1.5} className='ml-0.5' />
                      </Link>
                    </li>

                    <li>
                      <p className='text-gray-200' style={{ wordBreak: 'break-all' }}>
                        {doc}
                      </p>
                    </li>

                    <li className='flex overflow-auto bg-black'>
                      <div className='rounded-md p-2 text-sm'>
                        <pre>
                          <code className='!border-none !bg-transparent'>
                            {JSON.stringify(frontmatter, null, 2)}
                          </code>
                        </pre>
                      </div>
                    </li>
                  </ul>
                </div>
              </Collapse>
            );
          })}
        </div>
      </div>

      <div
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        className='arrow absolute bottom-full mb-9 ml-1 h-3 w-5 bg-[#1c1c1e]'
      />
    </>
  );
};

export default DevModePopover;
