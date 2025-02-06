'use client';

// * utils
import { cn, isEmptyObject } from '@/utils';

// * icons
import { IconArrowLeft, IconX } from '@tabler/icons-react';

// * components
// import MenuButton from '../core/MenuButton';
import SidebarItem from './SidebarItem';
import SidebarCollapse from './SidebarCollapse'; // * HOC

// * types
import type { SidebarTree } from '@/utils/sidebar';
import Logo from '@/components/core/Logo';

type SidebarProps = { sidebarTree: SidebarTree; className?: string };

const Sidebar = ({ sidebarTree, className }: SidebarProps) => {
  const menuOpenHandler = () => {
    document.documentElement.classList.add('menu-open');
  };

  const closeHandler = () => {
    document.documentElement.classList.remove('menu-open', 'sidebar-open');
  };

  const renderSidebar = (node: SidebarTree) => {
    if (!node || !node.title || isEmptyObject(node)) return null;

    const hasItems = node.items && node.items.length > 0;
    const children = hasItems ? node.items?.map(item => renderSidebar(item)) : null;
    const _SidebarCollapse = SidebarCollapse();

    return hasItems ? (
      <_SidebarCollapse
        key={node.href ?? node.title}
        title={<SidebarItem collapse href={node.href} title={node.title} />}
      >
        {children}
      </_SidebarCollapse>
    ) : (
      <SidebarItem
        key={node.href ?? node.title}
        href={node.href}
        title={node.title}
        className='block text-base'
      />
    );
  };

  return (
    <aside
      className={cn(
        'sidebar z-20 flex h-full w-11/12 max-w-80 flex-col gap-y-0.5 lg:w-full lg:max-w-none',
        'border-default pointer-events-auto overflow-y-auto border-r bg-background',
        '-translate-x-full p-4 pt-0 transition-transform duration-300 lg:translate-x-0 lg:pt-4',
        className,
      )}
    >
      <header className='sticky top-0 mb-2 bg-background pt-4 text-sm text-neutral lg:hidden'>
        <div className='flex items-center justify-between gap-x-4'>
          <button
            type='button'
            onClick={menuOpenHandler}
            className='mb-2 flex items-center gap-x-2'
          >
            <IconArrowLeft size={16} />
            Back to main menu
          </button>

          <button type='button' onClick={closeHandler} className='-mr-1 -mt-1'>
            <IconX size={20} />
          </button>
        </div>

        <div className='flex items-center justify-between gap-x-4'>
          <Logo className='w-14' />
        </div>
      </header>

      {sidebarTree.href && <SidebarItem href={sidebarTree.href} title={sidebarTree.title!} />}
      {sidebarTree.items?.map(item => renderSidebar(item))}
    </aside>
  );
};

export default Sidebar;
