import type { MetadataRoute } from 'next';

// * fast-glob
import { globSync as fg } from 'fast-glob';

// * config
import { nexdConfig } from '../../nexd.config';
const { url } = nexdConfig;

// * utils
import { docPathname, sitePathname } from '@/core/utils/path';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => {
  const docPages = fg('./src/docs/**/page.mdx', { absolute: true });
  const sitePages = fg('./src/app/\\(app\\)/**/page.(jsx|js|tsx|ts|mdx|md)', { absolute: true });
  const baseURL = url.endsWith('/') ? url.slice(0, -1) : url;
  const date = new Date();

  return [
    ...sitePages.map(page => {
      const pathname = sitePathname(page);
      let url = baseURL + pathname;
      url = url.endsWith('/') ? url.slice(0, -1) : url;

      return { url, lastModified: date };
    }),
    ...docPages.map(page => {
      const pathname = docPathname(page);
      let url = baseURL + pathname;
      url = url.endsWith('/') ? url.slice(0, -1) : url;

      return { url, lastModified: date };
    }),
  ];
};

export default sitemap;
