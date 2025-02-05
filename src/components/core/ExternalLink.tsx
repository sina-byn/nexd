// * utils
import { cn } from '@/utils';

// * icons
import { IconArrowUpRight } from '@tabler/icons-react';

// * types
import type { LinkProps } from '@/mdx-components';

type ExternalLinkProps = LinkProps & { className?: string };

const ExternalLink = ({ href, children, className }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener nofollow noreferrer'
      className={cn('inline-flex', className)}
    >
      {children}
      <IconArrowUpRight size={16} stroke={1.5} className='ml-0.5' />
    </a>
  );
};

export default ExternalLink;
