'use client';

import { useRef, useState } from 'react';

// * utils
import { cn } from '@/core/utils';

// * hooks
import useClickOutside from '@/core/hooks/useClickOutside';

// * icons
import { IconChevronRight } from '@tabler/icons-react';

// * types
type DropdownProps<T> = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  itemsClassName?: string;
};

const Dropdown = <T extends string>({
  title,
  children,
  className,
  itemsClassName,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleHandler = () => setOpen(prev => !prev);

  useClickOutside(toggleRef, setOpen.bind(null, false));

  return (
    <div className='dropdown relative size-fit select-none'>
      <div
        role='button'
        ref={toggleRef}
        onClick={toggleHandler}
        className={cn('toggle flex items-center gap-x-2 px-2 py-1', className)}
      >
        {title}
        <IconChevronRight size={16} className={cn(open && 'rotate-90')} />
      </div>

      <div
        className={cn(
          'items absolute left-0 top-full grid max-h-24 min-w-max flex-col overflow-y-auto rounded-md',
          open ? 'visible' : 'invisible',
          itemsClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
