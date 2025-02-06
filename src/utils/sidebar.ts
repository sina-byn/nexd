import 'server-only';

import fs from 'fs';
import path from 'path';

// * utils
import { docPathname } from './path';
import { extractFrontmatter } from './mdx';

// * types
type SidebarFrontmatter = { title?: string; label?: string; index?: number };

export type SidebarTree = Partial<{
  href: string;
  title: string;
  index: number;
  items: SidebarTree[];
}>;

export const extractSidebarTree = async (docsDir: string = './src/docs') => {
  const lastChunk = docsDir.split(/\/|\\/).at(-1);
  const sidebar: SidebarTree = {};

  for (const dirPath of fs.readdirSync(docsDir)) {
    const relativePath = path.join(docsDir, dirPath);
    const isFile = fs.statSync(relativePath).isFile();

    if (isFile && dirPath === 'page.mdx') {
      const mdx = fs.readFileSync(relativePath, 'utf-8');
      const { title, label, index } = await extractFrontmatter<SidebarFrontmatter>(mdx);

      sidebar.index = index;
      sidebar.title = label ?? title ?? lastChunk;
      sidebar.href = docPathname(relativePath.split(path.sep).slice(1).join(path.sep));

      continue;
    }

    const nestedSidebar = await extractSidebarTree(path.join(docsDir, dirPath));
    if (!sidebar.items) sidebar.items = [];

    sidebar.items.push(nestedSidebar);
  }

  sidebar.items?.forEach((item, i) => {
    const { index } = item;
    if (typeof index !== 'number' || i === index || !sidebar.items || !sidebar.items.length) return;

    [sidebar.items[i], sidebar.items[index]] = [sidebar.items[index], sidebar.items[i]];
  });

  return sidebar;
};

export const flatSidebar = (sidebarTree: SidebarTree) => {
  const hrefs: string[] = [];
  const titles: string[] = [];

  if (sidebarTree.href) {
    hrefs.push(sidebarTree.href);
    titles.push(sidebarTree.title!);
  }

  if (sidebarTree.items && sidebarTree.items.length > 0) {
    for (const item of sidebarTree.items) {
      if (item === undefined) continue;

      if (item.href) {
        hrefs.push(item.href);
        titles.push(item.title!);
      }

      const { href, ...innerSidebar } = item;
      if (item.items && item.items.length > 0) {
        const [innerHrefs, innerTitles] = flatSidebar(innerSidebar);

        hrefs.push(...innerHrefs);
        titles.push(...innerTitles);
      }
    }
  }

  return [hrefs, titles];
};
