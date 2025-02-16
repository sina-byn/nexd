import 'server-only';

// * types
import type { Icon, SyntaxHighlighter } from '@/core/types';
import type { BundledShikiTheme } from 'rehype-expressive-code';

// * config
import { nexdConfig } from '../../nexd.config';

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
