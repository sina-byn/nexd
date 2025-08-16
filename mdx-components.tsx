import path from 'path';

import NextLink from 'next/link';
import type { MDXComponents } from 'mdx/types';

// * fast-glob
import { globSync as fg } from 'fast-glob';

// * components
import Tabs from '@/core/components/Tabs';
import Picture from '@/core/components/Picture';
import Collapse from '@/core/components/Collapse';
import Dropdown from '@/core/components/Dropdown';
import VirtualTree from '@/core/components/VirtualTree';
import ExternalLink from '@/core/components/ExternalLink';
import Tree, { type TreeProps } from '@/core/components/Tree';
import Admonition, { type AdmonitionProps } from '@/core/components/Admonition';
import BrowserWindow, { type BrowserWindowProps } from '@/core/components/BrowserWindow';

// * types
type DynamicModule = { default: unknown };
type TabsProps = { labels: string; children: React.ReactNode };

export type LinkProps = { href: string; children: React.ReactNode };

// * TODO: register
const registerComponents = async () => {
  const componentPaths = fg('./src/components/**/*.{tsx,jsx}');
  const components: Record<string, Function> = {};

  for (let componentPath of componentPaths) {
    const { name, dir } = path.parse(componentPath);
    const isIndex = name === 'index';

    let modulePath = isIndex ? dir : [dir, name].join('/');
    modulePath = modulePath.replace('./src/components/', '');

    const mod: DynamicModule = await import(`@/components/${path.basename(modulePath)}`);
    const moduleName = isIndex ? dir.split('/').at(-1)! : name;

    if (!mod || typeof mod.default !== 'function') {
      throw new Error(
        `Module \`@/components/${modulePath}\` does not have a default export or is not a React component`,
      );
    }

    components[moduleName] = mod.default;
  }

  return components;
};

export const useMDXComponents = async (components?: MDXComponents): Promise<MDXComponents> => {
  const registry = await registerComponents();

  return {
    ...registry,

    Tabs,
    Tree,
    Picture,
    Collapse,
    Dropdown,
    Admonition,
    VirtualTree,
    BrowserWindow,

    // * Tabs
    tabs: ({ children, labels: _labels }: TabsProps) => {
      const labels: string[] = JSON.parse(_labels);

      return <Tabs labels={labels}>{children}</Tabs>;
    },

    // * Links
    a: ({ href, children }: LinkProps) => {
      const isRelative = href.startsWith('/') || href.startsWith('#');

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
