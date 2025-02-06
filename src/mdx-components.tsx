import NextLink from 'next/link';
import type { MDXComponents } from 'mdx/types';

// * components
import Tabs from '@/core/Tabs';
import Picture from '@/core/Picture';
import Collapse from '@/core/Collapse';
import Dropdown from '@/core/Dropdown';
import VirtualTree from '@/core/VirtualTree';
import ExternalLink from '@/core/ExternalLink';
import Tree, { type TreeProps } from '@/core/Tree';
import Admonition, { type AdmonitionProps } from '@/core/Admonition';
import BrowserWindow, { type BrowserWindowProps } from '@/core/BrowserWindow';

// * types
type TabsProps = { labels: string; children: React.ReactNode };

export type LinkProps = { href: string; children: React.ReactNode };

export const useMDXComponents = (components?: MDXComponents): MDXComponents => {
  return {
    Tabs,
    Tree,
    Picture,
    Collapse,
    Dropdown,
    VirtualTree,
    BrowserWindow,

    // * Tabs
    tabs: ({ children, labels: _labels }: TabsProps) => {
      const labels: string[] = JSON.parse(_labels);

      return <Tabs labels={labels}>{children}</Tabs>;
    },

    // * Links
    a: ({ href, children }: LinkProps) => {
      const isRelative = href.startsWith('/');

      return isRelative ? (
        <NextLink href={href}>{children}</NextLink>
      ) : (
        <ExternalLink href={href}>{children}</ExternalLink>
      );
    },

    // * Admonitions
    admonition: ({ type, children }: AdmonitionProps) => {
      return <Admonition type={type}>{children}</Admonition>;
    },

    // * BrowserWindows
    browser: ({ children }: BrowserWindowProps) => {
      return <BrowserWindow>{children}</BrowserWindow>;
    },

    // * Trees
    tree: ({ root, rootAlias }: TreeProps) => {
      return <Tree root={root} rootAlias={rootAlias} />;
    },

    ...components,
  };
};
