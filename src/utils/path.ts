import 'server-only';

import url from 'url';
import path from 'path';

export const __dirname = () => path.dirname(url.fileURLToPath(import.meta.url));

export const __srcdir = path.join(__dirname(), '..');

export const __appdir = path.join(__srcdir, 'app');

export const __docsdir = path.join(__srcdir, 'docs');

export const __rootdir = path.join(__dirname(), '..', '..');

export const normalizedSrcDir = __srcdir.split(path.sep).join('/');

export const normalizedAppDir = __appdir.split(path.sep).join('/');

export const docPathname = (docPath: string, dir: boolean = false) => {
  docPath = dir ? docPath : path.dirname(docPath);

  docPath = docPath
    .replace(__srcdir, '')
    .replace(normalizedSrcDir, '')
    .split(path.sep)
    .filter(Boolean)
    .join('/');

  return docPath.startsWith('/') ? docPath : '/' + docPath;
};

export const sitePathname = (sitePath: string, dir: boolean = false) => {
  sitePath = dir ? sitePath : path.dirname(sitePath);

  sitePath = sitePath
    .replace(__appdir, '')
    .replace(normalizedAppDir, '')
    .replace(/\/\([^)]*\)/g, '')
    .split(path.sep)
    .filter(Boolean)
    .join('/');

  return sitePath.startsWith('/') ? sitePath : '/' + sitePath;
};
