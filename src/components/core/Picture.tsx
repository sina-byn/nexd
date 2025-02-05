// * utils
import { cn } from '@/utils';

// * types
type PictureProps = {
  alt?: string;
  media?: boolean;
  darkSrc: string;
  lightSrc: string;
  className?: string;
};

const Picture = ({ alt, media, darkSrc, lightSrc, className }: PictureProps) => {
  return media ? (
    <picture>
      <source srcSet={lightSrc} media='(prefers-color-scheme: light)' />
      <img src={darkSrc} alt={alt} className={cn(className)} />
    </picture>
  ) : (
    <>
      <img alt={alt} src={lightSrc} className={cn('block dark:hidden', className)} />
      <img alt={alt} src={darkSrc} className={cn('hidden dark:block', className)} />
    </>
  );
};

export default Picture;
