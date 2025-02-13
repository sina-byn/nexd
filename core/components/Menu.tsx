'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// * utils
import { cn } from '@/core/utils';

// * components
import Dropdown from './Dropdown';

// * config
import { nexdConfig } from '../../nexd.config';
const { menu = [] } = nexdConfig;

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className='menu ml-4 hidden lg:block'>
      <ul className='flex items-center gap-x-6 capitalize'>
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

          return (
            <Dropdown
              key={item.title}
              title={item.title}
              itemsClassName='bg-neutral [&_>_*:hover]:bg-neutral-light [&_>_*]:px-2 [&_>_*]:py-1'
            >
              {item.items?.map(subItem => (
                <Link key={subItem.title} href={subItem.href}>
                  {subItem.title}
                </Link>
              ))}
            </Dropdown>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
