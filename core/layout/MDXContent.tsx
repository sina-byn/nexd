import { useMDXComponents } from '../../mdx-components';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

// * plugins
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeExpressiveCode from 'rehype-expressive-code';
import { remarkMDXPlugins, remarkTableOfContents } from '@/core/plugins/remarkPlugins';

// * types
type MDXContentProps = { source: MDXRemoteProps['source'] };

// * config
import { resolveExpressiveCodeConfig } from '@/core/utils/config';

const MDXContent = ({ source }: MDXContentProps) => {
  return (
    <MDXRemote
      source={source}
      components={useMDXComponents()}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypeExpressiveCode, resolveExpressiveCodeConfig()]],
          remarkPlugins: [
            remarkGfm,
            remarkFrontmatter,
            remarkDirective,
            remarkMDXPlugins,
            remarkTableOfContents,
          ],
        },
      }}
    />
  );
};

export default MDXContent;
