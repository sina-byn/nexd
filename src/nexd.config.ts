// * types
import type { BundledShikiTheme } from 'rehype-expressive-code';
import type { NexdConfig, Icon, SyntaxHighlighter } from '@/types';

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
    { title: 'Docs', href: '/docs' },
  ],

  // * footer config
  footer: [
    {
      title: 'social',
      items: [
        { social: 'github', href: 'https://github.com/sina-byn/nexd-docs' },
      ],
    },
    {
      title: 'learn',
      items: [
        { title: 'docs', href: '/docs' },
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

export const resolveFavicon = (): Icon[] => {
  const { favicon } = nexdConfig;
  if (!favicon) return [];

  const type = 'image/svg+xml';
  if (typeof favicon === 'string') return [{ type, href: favicon, url: favicon }];

  return [
    { type, href: favicon.dark, url: favicon.dark, media: '(prefers-color-scheme: dark)' },
    { type, href: favicon.light, url: favicon.light, media: '(prefers-color-scheme: light)' },
  ];
};

export const resolveExpressiveCodeConfig = () => {
  const DEFAULT_THEMES: SyntaxHighlighter = {
    dark: 'github-dark-high-contrast',
    light: 'github-light-default',
  };
  const { syntaxHighlighter: sh } = nexdConfig;
  const syntaxHighlighter = { ...DEFAULT_THEMES, ...sh };
  const darkTheme = syntaxHighlighter.dark;

  return {
    themes: [syntaxHighlighter.dark, syntaxHighlighter.light],
    themeCssSelector: (t: BundledShikiTheme) => (t === darkTheme ? '.dark' : '.light'),
  };
};
