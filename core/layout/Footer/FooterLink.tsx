import Link from 'next/link';

// * components
import SocialLink from '@/core/components/SocialLink';
import ExternalLink from '@/core/components/ExternalLink';

// * types
import type { FooterItem } from '@/core/types';

type FooterLinkProps = { item: FooterItem };

const FooterLink = ({ item }: FooterLinkProps) => {
  if ('social' in item) {
    return <SocialLink href={item.href} social={item.social} iconOnly={item.iconOnly} />;
  }

  if (item.href.startsWith('/'))
    return (
      <Link href={item.href} className='text-neutral'>
        {item.title}
      </Link>
    );

  return (
    <ExternalLink href={item.href} className='text-neutral'>
      {item.title}
    </ExternalLink>
  );
};

export default FooterLink;
