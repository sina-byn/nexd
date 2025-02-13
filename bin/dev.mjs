#!/usr/bin/env node

import { open } from 'openurl';
import { program } from 'commander';
import { spawn } from 'cross-spawn';
import { createInterface } from 'readline';

const args = process.argv.slice(2);
const rl = createInterface(process.stdin);

program
  .allowUnknownOption(true)
  .argument('[args...]')
  .option('-p, --port <number>', 'Next.js dev server port', 3000)
  .action((_, { port }) => {
    if (isNaN(+port)) throw new Error('--port is not valid number');
    process.env.PORT = port;

    rl.on('line', line => {
      switch (line.trim()) {
        case 'o':
          return open(`http://localhost:${port}`);
      }
    });

    spawn('npm', ['run', 'dev', '--', ...args], { stdio: 'inherit' });
  });

program.parse(program.argv);
