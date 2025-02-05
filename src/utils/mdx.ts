import 'server-only';

import fs from 'fs';
import path from 'path';

import { notFound } from 'next/navigation';

// * fast-glob
import { globSync as fg } from 'fast-glob';

// * js-yaml
import yaml from 'js-yaml';

// * remark
import type { Parent } from 'mdast';

import { remark } from 'remark';
import { visit } from 'unist-util-visit';

import remarkFrontmatter from 'remark-frontmatter';

// * utils
import { __srcdir } from './path';

// * types
type YAMLNode = { type: 'yaml'; value: string };

export const readMDXPage = (slug: string[]): [string, string] => {
  const pagePath = path.join(__srcdir, 'docs', ...slug, 'page.mdx');
  if (!fs.existsSync(pagePath)) return notFound();

  return [fs.readFileSync(pagePath, 'utf-8'), pagePath];
};

export const extractSlugs = () => {
  const slugs = fg('./src/docs/**/page.mdx').map(page => {
    const slug = page.replace('./src/docs/', '').replace('page.mdx', '').split('/').filter(Boolean);
    return { slug };
  });

  return slugs;
};

export const extractFrontmatter = async <T = Record<string, string>>(mdx: string) => {
  let frontmatter = {} as T;

  const remarkFrontmatterParser = () => {
    return (tree: Parent) => {
      visit(tree, 'yaml', (node: YAMLNode) => {
        frontmatter = yaml.load(node.value) as T;
      });
    };
  };

  await remark().use(remarkFrontmatter, ['yaml']).use(remarkFrontmatterParser).process(mdx);

  return frontmatter;
};
