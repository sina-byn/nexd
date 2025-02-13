'use client';

// * utils
import { cn } from '@/core/utils';

// * icons
import { IconMenu2 } from '@tabler/icons-react';

// * types
type MenuButtonProps = { className?: string };

const MenuButton = ({ className }: MenuButtonProps) => {
  const clickHandler = () => {
    const docEl = document.documentElement;
    const hasSidebarOpen = docEl.classList.contains('sidebar-open');

    docEl.classList.toggle('sidebar-open', !hasSidebarOpen);
  };

  return (
    <button type='button' onClick={clickHandler} className={cn('menu-button lg:hidden', className)}>
      <IconMenu2 />
    </button>
  );
};

export default MenuButton;
