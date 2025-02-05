import 'server-only';

import fs from 'fs';
import path from 'path';

// * utils
import { extractFrontmatter } from './mdx';
import { __srcdir, docPathname } from './path';

// * types
export type Breadcrumbs = { title: string; href: string }[];

export const extractBreadcrumbs = async (mdx: string, pagePath: string) => {
  const breadcrumbs: Breadcrumbs = [];
  let pageDir = path.dirname(pagePath);

  while (pageDir !== __srcdir) {
    if (fs.existsSync(pagePath)) {
      const href = docPathname(pageDir, true);
      const { crumb, label, title = 'Untitled' } = await extractFrontmatter(mdx);

      breadcrumbs.push({ href, title: crumb ?? label ?? title });
    }

    pageDir = path.join(pageDir, '..');
    pagePath = path.join(pageDir, 'page.mdx');
  }

  return breadcrumbs.reverse();
};
