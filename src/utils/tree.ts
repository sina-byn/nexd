// * constants
const LF = '\n'; // * Line Feed
const SP = '    '; // * Space
const BR = '├── '; // * Branch
const BRE = '└── '; // * Branch End
const PBR = '│   '; // * Pre Branch

// * types
type TreeItems = TTree['items'];

export type TTree = { name: string; dir?: boolean; items: TTree[] };

export const stringifyTree = (tree: TreeItems, level = 0, isParentLast = false) => {
  if (tree.length === 0) return '';
  let stringified = '';

  for (let i = 0; i < tree.length; i++) {
    const isLastNode = i === tree.length - 1;
    const node = tree[i];

    const line = [
      LF,
      isLastNode
        ? isParentLast
          ? Array.from({ length: level }, (_, index) => (index < level - 1 ? PBR : SP))
          : Array(level).fill(PBR)
        : Array.from({ length: level }, (_, index) => (index < level ? PBR : SP)),
      isLastNode ? BRE : BR,
      node.name,
      node.dir ? '/' : '',
    ]
      .flat()
      .join('');

    stringified += line;
    stringified += stringifyTree(node.items, level + 1, isLastNode);
  }

  return stringified;
};
