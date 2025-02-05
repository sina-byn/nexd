// * config
import { nexdConfig } from '@/nexd.config';

// * slugify
import slugify from 'slugify';

// * unified
import { visit } from 'unist-util-visit';

import type { Parent, Heading, RootContent, PhrasingContent } from 'mdast';

// * types
import { TTableOfContents } from '@/types';

type AdmonitionType = typeof ADMONITION_TYPES extends Set<infer T> ? T : never;

type Directive = { name: string };

type Paragraph = { type: 'paragraph'; children: { value: string }[] };

type Admonition = {
  type: 'admonition';
  children: (Admonition | AdmonitionDirective)[];
  data: { hName: 'admonition'; hProperties: { type: AdmonitionType } };
};

type AdmonitionDirective = {
  name: AdmonitionType;
  type: 'containerDirective';
  children: (Admonition | AdmonitionDirective)[];
  data: { hName: 'admonition'; hProperties: { type: string } };
};

type BrowserDirective = {
  name: 'browser';
  type: 'containerDirective';
  children: PhrasingContent[];
};

type TabsDirective = {
  name: 'tabs';
  type: 'containerDirective';
  children: [Paragraph, ...PhrasingContent[]];
};

type TreeDirective = {
  name: 'tree';
  type: 'leafDirective';
  children: PhrasingContent[];
};

// * constants
const ADMONITION_TYPES = new Set(['note', 'tip', 'info', 'warning', 'danger'] as const);

// * helpers
const textContent = (children: PhrasingContent[]) => {
  return children.reduce((text, child) => {
    if ('value' in child) text += child.value;
    if ('children' in child) text += textContent(child.children);
    return text;
  }, '');
};

const nestedAdmonitions = (node: AdmonitionDirective) => {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (child.type === 'containerDirective' && child.name && ADMONITION_TYPES.has(child.name)) {
      nestedAdmonitions(child);

      node.children[i] = {
        type: 'admonition',
        children: child.children,
        data: { hName: 'admonition', hProperties: { type: child.name } },
      };
    }
  }
};

export const remarkMDXPlugins = () => {
  return (tree: Parent) => {
    visit(tree, 'containerDirective', (node: Directive, index: number) => {
      // * handle admonitions
      if (ADMONITION_TYPES.has(node.name as AdmonitionType)) {
        const admonitionNode = node as AdmonitionDirective;
        nestedAdmonitions(admonitionNode);

        const admonition = {
          type: 'admonition',
          children: admonitionNode.children,
          data: { hName: 'admonition', hProperties: { type: admonitionNode.name } },
        };

        tree.children[index] = admonition as RootContent;
        return;
      }

      // * handle :::browser directives
      if (node.name === 'browser') {
        const browserDirective = node as BrowserDirective;
        const browser = {
          type: 'browser',
          data: { hName: 'browser' },
          children: browserDirective.children,
        };

        tree.children[index] = browser as RootContent;
        return;
      }

      // * handle :::tabs directives
      if (node.name !== 'tabs') return;
      const tabsDirective = node as TabsDirective;
      const firstChild = tabsDirective.children.shift();
      if (firstChild?.type !== 'paragraph') throw new Error('Could not find labels');

      const labels = firstChild.children[0].value.split(/\s*,+\s*/);

      const tabs = {
        type: 'tabs',
        children: tabsDirective.children,
        data: { hName: 'tabs', hProperties: { labels: JSON.stringify(labels) } },
      };

      tree.children[index] = tabs as RootContent;
    });

    // * handle ::Tree leaf directives
    visit(tree, 'leafDirective', (node: TreeDirective, index: number) => {
      if (node.name === 'tree') {
        const firstChild = node.children[0];
        if (!firstChild || firstChild.type !== 'text') return;

        const [root, rootAlias = '.'] = firstChild.value.trim().split(/,\s*/);

        const _tree = {
          type: 'tree',
          data: { hName: 'tree', hProperties: { root, rootAlias } },
        };

        tree.children[index] = _tree as RootContent;
      }
    });
  };
};

export const remarkTableOfContents = (tableOfContents: TTableOfContents = []) => {
  return (tree: Parent) => {
    visit(tree, 'heading', (node: Heading) => {
      const { min, max } = { min: 2, max: 3, ...nexdConfig.tableOfContents };
      const { depth } = node;
      if (depth < min || depth > max) return;

      const content = textContent(node.children);
      const id = slugify(content, { lower: true });
      node.data = { ...node.data, hProperties: { id, ...node.data?.hProperties } };

      tableOfContents.push([depth, id, content]);
    });
  };
};
