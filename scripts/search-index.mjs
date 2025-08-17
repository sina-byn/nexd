import fs from 'fs';

// * config
import nextConfig from '../next.config.mjs';

// * pagefind
import * as pagefind from 'pagefind';

// * fast-glob
import fastGlob from 'fast-glob';
const { globSync: fg } = fastGlob;

const isExportMode = nextConfig.output === 'export';
const pattern = isExportMode ? './out/**/*.html' : './.next/server/app/**/*.html';
const prefix = isExportMode ? './out' : './.next/server/app';

const pages = fg(pattern, { ignore: '**/_*.html' });

const { index } = await pagefind.createIndex();

for (const page of pages) {
  const pathname = page.replace(prefix, '').replace(/index.html|.html/g, '');
  const html = fs.readFileSync(page, 'utf-8');

  const { errors } = index.addHTMLFile({ content: html, url: pathname });
  if (errors && errors.length > 0) console.error(errors);
}

const { errors } = await index.writeFiles({ outputPath: './public/_pagefind' });
if (errors && errors.length > 0) console.error(errors);

await pagefind.close();
