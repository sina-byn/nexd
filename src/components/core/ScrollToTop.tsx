'use client';

import { useState, useEffect } from 'react';

// * utils
import { cn } from '@/utils';

//* icons
import { IconCircleArrowUp } from '@tabler/icons-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const clickHandler = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const scrollHandler = () => setVisible(window.scrollY > 350);

    scrollHandler();
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <button
      type='button'
      onClick={clickHandler}
      className={cn(
        'flex items-center gap-x-1.5 text-sm text-neutral',
        !visible && 'hidden',
      )}
    >
      Scroll to top
      <IconCircleArrowUp size={18} className='-mb-0.5' />
    </button>
  );
};

export default ScrollToTop;
