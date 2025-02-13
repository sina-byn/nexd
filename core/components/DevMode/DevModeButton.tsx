'use client';

import { useRef, useState } from 'react';

// * utils
import { cn } from '@/core/utils';

// * hooks
import useClickOutside from '@/core/hooks/useClickOutside';

// * HOCs
import { withIconOverrides } from '@/core/HOCs';

// * icons
import { IconCode, IconCodeOff } from '@tabler/icons-react';

// * types
type DevModeBttonProps = { children: React.ReactNode };

const DevModeBtton = ({ children }: DevModeBttonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const Icon = withIconOverrides(open ? IconCodeOff : IconCode, { size: 16, stroke: 2.5 });
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleHandler = () => setOpen(prev => !prev);

  useClickOutside<HTMLDivElement>(popoverRef, setOpen.bind(null, false));

  return (
    <div ref={popoverRef}>
      <button
        type='button'
        onClick={toggleHandler}
        className='flex size-[30px] items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e] text-foreground-light focus:outline-none'
      >
        <Icon className='pointer-events-none' />
      </button>

      <div className={cn('relative', !open && 'hidden')}>{children}</div>
    </div>
  );
};

export default DevModeBtton;
