// * utils
import { stringifyTree, type TTree } from '@/core/utils/tree';

// * types
export type TreeProps = { tree: TTree; rootAlias?: string };

const VirtualTree = ({ tree, rootAlias = '.' }: TreeProps) => {
  return (
    <pre className='directory-tree !-mt-3 border border-neutral-400/10 bg-white dark:bg-[#0a0a0a]'>
      <code>{rootAlias + stringifyTree(tree.items)}</code>
    </pre>
  );
};

export default VirtualTree;
