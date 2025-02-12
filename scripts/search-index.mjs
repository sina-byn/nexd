import fs from 'fs';

// * pagefind
import * as pagefind from 'pagefind';

// * fast-glob
import fastGlob from 'fast-glob';
const { globSync: fg } = fastGlob;

const pages = fg('./.next/server/app/**/*.html', { ignore: '**/_*.html' });

const { index } = await pagefind.createIndex();

for (const page of pages) {
  const pathname = page.replace('./.next/server/app', '').replace(/index.html|.html/g, '');
  const html = fs.readFileSync(page, 'utf-8');

  const { errors } = index.addHTMLFile({ content: html, url: pathname });
  if (errors && errors.length > 0) console.error(errors);
}

const { errors } = await index.writeFiles({ outputPath: './public/_pagefind' });
if (errors && errors.length > 0) console.error(errors);

await pagefind.close();
