import fs from 'fs';
import prompts from 'prompts';
import { rimrafSync } from 'rimraf';

const { ok } = await prompts(
  {
    name: 'ok',
    type: 'toggle',
    message: 'Are you sure you want to reset nexd project?',
  },
  { onCancel: () => process.exit() },
);

if (!ok) process.exit();

// * remove unnecessary files
rimrafSync('./src/app/(app)/page.tsx');
rimrafSync('./src/docs/**/*', { glob: true });
rimrafSync('./src/components/**/*', { glob: true });

// * reset /docs page
const mdx = `---
title: Getting Started
---

# Getting Started
`;

fs.writeFileSync('./src/docs/page.mdx', mdx, 'utf-8');

// * reset nexd.config.ts
const config = `
// * types
import type { NexdConfig } from '@/core/types';

export const nexdConfig: NexdConfig = {
  editURL: '',
  favicon: { dark: '/logo-dark.svg', light: '/logo-light.svg' },
  logo: { alt: 'nexd logo', dark: '/logo-dark.svg', light: '/logo-light.svg' },
  tableOfContents: { min: 2, max: 3 },

  // * deployment config
  url: '',

  // * menu config
  menu: [
    { title: 'Home', href: '/' },
    { title: 'Docs', href: '/docs' },
  ],

  // * footer config
  footer: [],
};
`;

fs.writeFileSync('nexd.config.ts', config, 'utf-8');

// * reset RootLayout
const FluidCursorRegex = /<FluidCursor\s*\/>\r?\n|import\s+FluidCursor[^;]+;\r?\n/g; // * FluidCursor Invocation and import regex
const ROOT_LAYOUT_PATH = './src/app/layout.tsx';
let rootLayout = fs.readFileSync(ROOT_LAYOUT_PATH, 'utf-8');

fs.writeFileSync(ROOT_LAYOUT_PATH, rootLayout.replace(FluidCursorRegex, ''));
