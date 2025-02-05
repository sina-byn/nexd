'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// * icons
import { cn } from '@/utils';

// * icons
import { IconArrowRight, IconChevronRight } from '@tabler/icons-react';

// * components
import Collapse from './Collapse';

// * config
import { nexdConfig } from '@/nexd.config';
import Logo from './Logo';
const { menu = [] } = nexdConfig;

const MenuMobile = () => {
  const pathname = usePathname();

  const clickHandler = () => {
    document.documentElement.classList.remove('menu-open');
  };

  return (
    <div className='menu-mobile border-default pointer-events-auto fixed flex h-full w-11/12 max-w-80 -translate-x-full flex-col overflow-y-auto border-r bg-background p-4 pt-0 transition-transform duration-300 lg:!-translate-x-full'>
      <header className='sticky top-0 mb-2 bg-background pt-4 text-sm text-neutral lg:hidden'>
        <button
          type='button'
          onClick={clickHandler}
          className='mb-2 ml-auto mr-0 flex items-center gap-x-2'
        >
          Back to sidebar
          <IconArrowRight size={16} />
        </button>

        <div className='flex items-center justify-between gap-x-4'>
          <Logo className='w-14' />
        </div>
      </header>

      <nav className='menu'>
        <ul className='flex flex-col gap-y-2 capitalize'>
          {menu.map(item => {
            if (item.href)
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(item.href === pathname && 'font-medium text-primary')}
                >
                  {item.title}
                </Link>
              );

            if (!item.items || item.items.length === 0) return null;

            const CollapseTitle = (
              <button
                key={item.title}
                type='button'
                className='flex w-full items-center justify-between gap-x-2'
              >
                {item.title}

                <IconChevronRight size={16} className='shrink-0' />
              </button>
            );

            return (
              <Collapse
                key={item.title}
                title={CollapseTitle}
                contentClassName='pl-3'
                titleClassName='peer-checked:[&_svg]:rotate-90'
              >
                <div className='flex flex-col gap-y-2 pt-2'>
                  {item.items?.map(subItem => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className={cn(
                        'block',
                        subItem.href === pathname && 'font-medium text-primary',
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </Collapse>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MenuMobile;
