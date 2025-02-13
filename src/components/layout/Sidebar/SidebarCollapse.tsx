import { useRef, useState, useEffect } from 'react';

// * components
import Collapse, { type CollapseProps } from '@/core/Collapse';

// * types
type SidebarCollapseProps = Pick<CollapseProps, 'title' | 'children'>;

const withDefaultOpen = () => {
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);
  const collapseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const collapse = collapseRef.current;
    if (!collapse) return;

    const activeLink = collapse.querySelector('a.active-link');
    if (!activeLink || !collapse.contains(activeLink)) return;

    setDefaultOpen(true);
  }, []);

  return ({ title, children }: SidebarCollapseProps) => (
    <Collapse
      ref={collapseRef}
      title={title}
      defaultOpen={defaultOpen}
      contentClassName='pl-2'
      titleClassName='peer-checked:[&_>_a_>svg]:rotate-90'
    >
      <div className='space-y-0.5 pt-0.5'>{children}</div>
    </Collapse>
  );
};

export default withDefaultOpen;
