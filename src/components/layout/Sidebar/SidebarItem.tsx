import Link from 'next/link';
import { usePathname } from 'next/navigation';

// * utils
import { cn, normalizeTitle } from '@/utils';

// * icons
import { IconChevronRight } from '@tabler/icons-react';

// * types
type SidebarItemProps = {
  href?: string;
  title: string;
  collapse?: boolean;
  className?: string;
};

const SidebarItem = ({
  href,
  title,
  collapse = false,
  className: _className,
}: SidebarItemProps) => {
  const pathname = usePathname();

  const Icon = <IconChevronRight size={18} className='transition-transform duration-150' />;
  const className = cn(
    'flex w-full items-center gap-x-1 rounded-md px-2 py-1',
    href === pathname ? 'active-link bg-primary/15 text-primary' : 'hover:bg-neutral',
    _className,
  );

  return href ? (
    <Link href={href} className={className}>
      {normalizeTitle(title)}
      {collapse && Icon}
    </Link>
  ) : (
    <p className={className}>
      {normalizeTitle(title)}
      {collapse && Icon}
    </p>
  );
};

export default SidebarItem;
