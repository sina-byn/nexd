// * HOCs
import { withIconOverrides } from '../HOCs';

// * icons
import {
  IconBrandX,
  IconBrandNpm,
  IconBrandGithub,
  IconBrandReddit,
  IconBrandDiscord,
  IconBrandLinkedin,
  IconBrandInstagram,
  type Icon,
} from '@tabler/icons-react';

const ICONS: SocialIcons = {
  x: IconBrandX,
  npm: IconBrandNpm,
  github: IconBrandGithub,
  reddit: IconBrandReddit,
  discord: IconBrandDiscord,
  linkedin: IconBrandLinkedin,
  instagram: IconBrandInstagram,
};

// * types
import type { SocialMedia } from '@/types';

type SocialIcons = Record<SocialMedia, Icon>;

type SocialLinkProps = { href: string; social: SocialMedia; iconOnly?: boolean };

const SocialLink = ({ href, social, iconOnly }: SocialLinkProps) => {
  const Icon = withIconOverrides(ICONS[social], { size: 20, stroke: 1.5 });

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener nofollow noreferrer'
      className='flex items-center gap-x-2 capitalize text-gray-400 hover:text-white'
    >
      <Icon className='-mt-0.5' />
      {!iconOnly && <span>{social}</span>}
    </a>
  );
};

export default SocialLink;
