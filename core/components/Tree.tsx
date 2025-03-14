import fs from 'fs';

// * fast-glob
import { globSync as fg } from 'fast-glob';

// * components
import VirtualTree from './VirtualTree';

// * types
import { type TTree } from '@/core/utils/tree';

export type TreeProps = { root: string; rootAlias?: string };

const Tree = ({ root, rootAlias = '.' }: TreeProps) => {
  if (!fs.existsSync(root)) throw new Error(`${root} does not exist`);
  if (fs.statSync(root).isFile()) throw new Error(`'${root}' is not a directory`);

  const tree: TTree = { name: rootAlias, dir: true, items: [] };
  const normalizedRoot = root.replace(/\\/g, '/');
  const pattern = `${normalizedRoot}/**`;
  const paths = fg(pattern, {
    onlyFiles: false,
    markDirectories: true,
    ignore: ['node_modules/**'],
  });

  // * create tree
  for (const path of paths) {
    const pathChunks = path.replace(root, '').split('/').filter(Boolean);
    const isDir = path.endsWith('/');
    let subTree = tree.items;

    for (const chunk of pathChunks) {
      let node = subTree.find(n => n.name === chunk);

      if (!node) {
        node = { name: chunk, dir: isDir, items: [] };
        subTree.push(node);
      }

      subTree = node.items;
    }
  }

  return <VirtualTree tree={tree} rootAlias={rootAlias} />;
};

export default Tree;
