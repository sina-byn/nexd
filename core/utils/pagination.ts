import 'server-only';

// * utils
import { docPathname } from './path';
import { flatSidebar, type SidebarTree } from './sidebar';

// * types
export type Pagination = [PaginationItem, PaginationItem];

type PaginationItem = { href: string | null; title: string | null };

export const extractPagination = (sidebarTree: SidebarTree, pagePath: string): Pagination => {
  const pathname = docPathname(pagePath);
  const [hrefs, titles] = flatSidebar(sidebarTree);
  
  const pathnameIndex = hrefs.indexOf(pathname);

  if (pathnameIndex === -1) {
    return [
      { href: '', title: '' },
      { href: '', title: '' },
    ];
  }

  const prevIndex = pathnameIndex - 1;
  const nextIndex = pathnameIndex + 1;

  const prevHref = prevIndex > -1 ? hrefs[prevIndex] : null;
  const prevTitle = prevHref ? titles[prevIndex] : null;

  const nextHref = nextIndex < hrefs.length ? hrefs[nextIndex] : null;
  const nextTitle = nextHref ? titles[nextIndex] : null;

  return [
    { href: prevHref, title: prevTitle },
    { href: nextHref, title: nextTitle },
  ];
};
