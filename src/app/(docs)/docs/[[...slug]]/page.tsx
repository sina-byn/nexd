import type { Metadata } from 'next';

// * remark
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import { remarkTableOfContents } from '@/plugins/remarkPlugins';

// * utils
import { extractSidebarTree } from '@/utils/sidebar';
import { extractBreadcrumbs } from '@/utils/breadcrumbs';
import { readMDXPage, extractSlugs, extractFrontmatter } from '@/utils/mdx';

// * providers
import MDXContent from '@/layout/MDXContent';

// * components
import EditURL from '@/core/EditURL';
import Pagination from '@/core/Pagination';
import ScrollToTop from '@/core/ScrollToTop';
import Breadcrumbs from '@/core/Breadcrumbs';
import TableOfContents from '@/core/TableOfContents';
import TableOfContentsMobile from '@/core/TableOfContentsMobile';

// * types
import type { TTableOfContents } from '@/types';

type DocParams = Promise<{ slug: string[] }>;

type DocPageProps = { params: DocParams };

// * metadata
export const generateMetadata = async ({ params }: DocPageProps) => {
  const { slug = [] } = await params;
  const [mdx] = readMDXPage(slug);

  return await extractFrontmatter<Metadata>(mdx);
};

export const generateStaticParams = () => {
  return extractSlugs();
};

const DocPage = async ({ params }: DocPageProps) => {
  const { slug = [] } = await params;
  const [mdx, pagePath] = readMDXPage(slug);

  const breadcrumbs = await extractBreadcrumbs(pagePath);
  const toc: TTableOfContents = [];

  await remark().use(remarkFrontmatter).use(remarkTableOfContents, toc).process(mdx);
  const sidebarTree = await extractSidebarTree();

  return (
    <>
      <div className='mx-auto min-h-dvh w-full pt-16'>
        <div className='relative isolate mx-auto w-full px-4 py-8 lg:px-8'>
          <main className='prose mx-auto max-w-4xl pb-12 dark:prose-invert lg:prose-lg prose-p:text-base prose-a:text-primary prose-a:no-underline lg:pb-32'>
            <Breadcrumbs crumbs={breadcrumbs} />

            <TableOfContentsMobile toc={toc} />

            <MDXContent source={mdx} />

            <Pagination sidebarTree={sidebarTree} pagePath={pagePath} />
          </main>
        </div>
      </div>

      <div className='sticky top-16 hidden h-[calc(100dvh_-_4rem)] w-[300px] flex-col py-8 lg:flex'>
        <div className='border-default h-fit max-h-full w-full overflow-y-auto border-l'>
          <TableOfContents toc={toc} />
        </div>

        <div className='space-y-2 pt-4'>
          <EditURL pagePath={pagePath} />
          <ScrollToTop />
        </div>
      </div>
    </>
  );
};

export default DocPage;
