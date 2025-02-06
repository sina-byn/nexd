import 'server-only';

import fs from 'fs';
import path from 'path';

// * utils
import { normalizeTitle } from '.';
import { extractFrontmatter } from './mdx';
import { __srcdir, docPathname } from './path';

// * types
export type Breadcrumbs = { title: string; href: string }[];

export const extractBreadcrumbs = async (pagePath: string) => {
  const breadcrumbs: Breadcrumbs = [];
  let pageDir = path.dirname(pagePath);

  while (pageDir !== __srcdir) {
    if (fs.existsSync(pagePath)) {
      const mdx = fs.readFileSync(pagePath, 'utf-8');
      const href = docPathname(pageDir, true);
      const lastChunk = normalizeTitle(pageDir.split(path.sep).at(-1) ?? '');
      const { crumb, label, title } = await extractFrontmatter(mdx);

      breadcrumbs.push({ href, title: crumb ?? label ?? title ?? lastChunk });
    }

    pageDir = path.join(pageDir, '..');
    pagePath = path.join(pageDir, 'page.mdx');
  }

  return breadcrumbs.reverse();
};
