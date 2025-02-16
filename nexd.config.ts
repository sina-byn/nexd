// * types
import type { NexdConfig } from '@/core/types';

export const nexdConfig: NexdConfig = {
  editURL: 'https://github.com/sina-byn/nexd-docs',
  favicon: { dark: '/logo-dark.svg', light: '/logo-light.svg' },
  logo: { alt: 'nexd logo', dark: '/logo-dark.svg', light: '/logo-light.svg' },
  tableOfContents: { min: 2, max: 3 },

  // * deployment config
  url: 'https://nexd-docs.vercel.app',

  // * menu config
  menu: [
    { title: 'Home', href: '/' },
    { title: 'Docs', href: '/docs/getting-started' },
  ],

  // * footer config
  footer: [
    {
      title: 'social',
      items: [{ social: 'github', href: 'https://github.com/sina-byn/nexd-docs' }],
    },
    {
      title: 'learn',
      items: [
        { title: 'docs', href: '/docs/getting-started' },
        { title: 'mdx', href: 'https://mdxjs.com/' },
        { title: 'next.js', href: 'https://nextjs.org/' },
        {
          title: 'next-mdx',
          href: 'https://nextjs.org/docs/app/building-your-application/configuring/mdx',
        },
      ],
    },
  ],
};
