import type { BundledShikiTheme } from 'rehype-expressive-code';

export type Icon = { type: string; url: string; href: string; media?: ColorSchemeMedia };

export type Title = string | { base: string; prefix?: string; postfix?: string };

export type ColorScheme = 'dark' | 'light';

export type ColorSchemeMedia = `(prefers-color-scheme: ${ColorScheme})`;

export type Favicon = { dark: string; light: string };

export type Picture = { alt: string; src: string } | { alt: string; dark: string; light: string };

export type SyntaxHighlighter = { dark: BundledShikiTheme; light: BundledShikiTheme };

export type Menu = MenuItem[];

export type MenuItem = MenuLink | MenuDropdown;

export type MenuLink = { href: string; title: string; items?: never };

export type MenuDropdown = { title: string; items: MenuLink[]; href?: never };

export type Footer = FooterColumn[];

export type FooterColumn = { title: string; items: FooterItem[] };

export type FooterItem =
  | { href: string; title: string }
  | { href: string; social: SocialMedia; iconOnly?: boolean };

export type SocialMedia = 'x' | 'npm' | 'github' | 'reddit' | 'discord' | 'linkedin' | 'instagram';

export type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6;

// * [HeadingDepth, ID, Content]
export type TTableOfContents = [HeadingDepth, string, string][];

export type NexdConfig = {
  title: Title;
  url: string;
  logo?: Picture;
  favicon?: Favicon;
  editURL?: string;
  menu?: Menu;
  footer?: Footer;
  syntaxHighlighter?: Partial<SyntaxHighlighter>;
  tableOfContents?: { min?: HeadingDepth; max?: HeadingDepth };
};
