import Link from 'next/link';

// * utils
import { cn } from '@/core/utils';

// * components
import Picture from './Picture';

// * config
import { nexdConfig } from '../../nexd.config';

// * types
type LogoProps = { className?: string };

const Logo = ({ className }: LogoProps) => {
  const { logo } = nexdConfig;
  if (!logo) return null;

  if ('src' in logo) {
    return (
      <Link href='/' className='shrink-0'>
        <img alt={logo.alt} src={logo.src} className={cn('aspect-video w-16', className)} />
      </Link>
    );
  }

  return (
    <Link href='/' className='shrink-0'>
      <Picture
        alt={logo.alt}
        darkSrc={logo.dark}
        lightSrc={logo.light}
        className={cn('aspect-video w-16', className)}
      />
    </Link>
  );
};

export default Logo;
