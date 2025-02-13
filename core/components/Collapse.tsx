'use client';

import { useState } from 'react';

// * utils
import { cn } from '@/core/utils';

// * types
export type CollapseProps = {
  ref?: React.Ref<HTMLDivElement>;
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
};

const Collapse = ({
  ref,
  title,
  children,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
}: CollapseProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const toggleHandler = () => setOpen(prev => !prev);

  return (
    <div ref={ref} className={cn('collapse', className)}>
      <input type='checkbox' className='peer' readOnly checked={open} />

      <div
        role='button'
        onClick={toggleHandler}
        className={cn('collapse-title cursor-pointer', titleClassName)}
      >
        {title}
      </div>

      <div className={cn('collapse-content', contentClassName)}>{children}</div>
    </div>
  );
};

export default Collapse;
