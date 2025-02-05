// * utils
import { cn } from '@/utils';

// * icons
import {
  IconBulb,
  IconFlame,
  IconInfoCircle,
  IconExclamationCircle,
  IconAlertTriangleFilled,
  type Icon,
} from '@tabler/icons-react';

// * HOCs
import { withIconOverrides } from '../HOCs';

// * constants
const ADMONITION_TYPES = {
  note: 'bg-note border-note-dark dark:border-note-light',
  tip: 'bg-tip border-tip-light',
  info: 'bg-info border-info-light',
  warning: 'bg-warning border-warning-light',
  danger: 'bg-danger border-danger-light',
};

const ICONS: AdmonitionIcons = {
  note: IconInfoCircle,
  tip: IconBulb,
  info: IconExclamationCircle,
  warning: IconAlertTriangleFilled,
  danger: IconFlame,
};

// * types
type AdmonitionType = keyof typeof ADMONITION_TYPES;

type AdmonitionIcons = Record<AdmonitionType, Icon>;

export type AdmonitionProps = {
  icon?: Icon;
  type: AdmonitionType;
  className?: string;
  children: React.ReactNode;
};

const Admonition = ({ icon, type, className, children }: AdmonitionProps) => {
  const Icon = withIconOverrides(icon ?? ICONS[type], { size: 22, stroke: 1.5 });

  return (
    <article
      className={cn(
        'admonition not-prose text-foreground-light mt-4 overflow-hidden rounded-md border-l-[5px] p-4',
        type,
        ADMONITION_TYPES[type],
        className,
      )}
    >
      <header className='flex items-center gap-x-1 text-sm font-bold uppercase'>
        <Icon />
        {type}
      </header>

      <div className={cn('mt-2 *:m-0', type)}>{children}</div>
    </article>
  );
};

export default Admonition;
