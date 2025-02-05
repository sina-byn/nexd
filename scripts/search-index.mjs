import fs from 'fs';
import url from 'url';
import path from 'path';

import fastGlob from 'fast-glob';
import flexSearch from 'flexsearch';

// * js-yaml
import yaml from 'js-yaml';

// * remark
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import remarkFrontmatter from 'remark-frontmatter';

const { Document } = flexSearch;
const { globSync: fg } = fastGlob;

// * constants
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __publicdir = path.join(__dirname, '..', 'public');
const __srcdir = path.join(__dirname, '..', 'src');

const normalizedSrcDir = __srcdir.split(path.sep).join('/');

// * utils
const toPathname = path => {
  return path.replace(normalizedSrcDir, '').replace('/page.mdx', '');
};

const extractMDAST = mdx => {
  let tree;

  const plugin = () => {
    return node => {
      tree = node;
    };
  };

  remark().use(remarkFrontmatter).use(plugin).processSync(mdx);

  return tree;
};

const extractFrontmatter = mdast => {
  let frontmatter = {};

  visit(mdast, 'yaml', node => {
    frontmatter = yaml.load(node.value);
  });

  return frontmatter;
};

const generateIndex = () => {
  const pages = fg('./src/docs/**/page.mdx', { absolute: true });

  const index = new Document({
    tokenize: 'forward',
    document: { index: ['title', 'content'], store: ['title'] },
  });

  for (const page of pages) {
    const pathname = toPathname(page);
    const mdx = fs.readFileSync(page, 'utf-8');
    const tree = extractMDAST(mdx);
    const { title, label } = extractFrontmatter(tree);
    const indexTitle = label ?? title ?? pathname.split('/').at(-1);

    index.add({ id: pathname, title: indexTitle, content: mdx });
  }

  return index;
};

const storeIndex = async index => {
  const writer = fs.createWriteStream(path.join(__publicdir, 'index'));
  writer.write('[');

  await index.export((id, value) => {
    writer.write(JSON.stringify([id, value]) + ',');
  });

  // * append an empty array to avoid trailing comma warning
  writer.write('[]]');
  writer.end();
};

const index = generateIndex();
await storeIndex(index);
