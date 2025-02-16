#!/usr/bin/env node

import pc from 'picocolors';
import killPort from 'kill-port';

import { open } from 'openurl';
import { spawn } from 'cross-spawn';
import { program } from 'commander';
import { createInterface } from 'readline';

const args = process.argv.slice(2);
let cp; // Cross-spawn child process reference
let rl; // Readline interface instance

const killServer = async () => {
  if (process.env.PORT) {
    try {
      await killPort(process.env.PORT);
    } catch (err) {
      console.error(pc.red(`⚠️ Error killing port ${process.env.PORT}:`), err);
    }
  }
};

const exitProcess = async () => {
  console.log(pc.cyan('\n👋 Exiting...'));

  if (cp) cp.kill();
  if (rl) rl.close();

  setTimeout(() => {
    console.log(pc.bold(pc.magenta('🚪 Process exited. See you next time! ✨')));
    process.exit(0);
  }, 100);
};

const printCommands = () => {
  console.log(
    pc.bold(
      pc.blue(`
🚀 Dev server started at ${pc.underline(`http://localhost:${process.env.PORT}`)}
🔹 Available commands:
   - ${pc.yellow('[o]')}     → Open in browser
   - ${pc.yellow('[rs]')}    → Restart server
   - ${pc.yellow('[cls]')}   → Clear console
   - ${pc.yellow('[.exit]')} → Exit process
`),
    ),
  );
};

const initReadline = () => {
  if (rl) rl.close();
  rl = createInterface({ input: process.stdin });

  rl.on('line', async line => {
    switch (line.trim()) {
      case 'o':
        console.log(pc.green('🌍 Opening in browser...'));
        open(`http://localhost:${process.env.PORT}`);
        break;

      case 'rs':
        console.log(pc.yellow('♻️ Restarting server...'));
        cp.kill();
        await killServer();
        startDevServer();
        break;

      case 'cls':
        console.clear();
        break;

      case '.exit':
        await exitProcess();
        break;

      default:
        console.log(pc.red('❌ Unknown command! Use [o], [rs], or [.exit]'));
    }
  });

  return rl;
};

const startDevServer = () => {
  console.clear();

  printCommands();
  setTimeout(() => initReadline(), 100); 

  cp = spawn('npm', ['run', 'dev', '--', ...args], { stdio: 'inherit' });

  cp.on('close', async () => {
    console.log(pc.red('🚫 Dev server stopped.'));
    await killServer();
    rl.close();
  });
};

process.on('beforeExit', killServer);

process.on('uncaughtException', async err => {
  console.error(pc.bgRed(pc.white('❌ Uncaught exception:')), err);
  process.exit(1);
});

// CLI configuration
program
  .allowUnknownOption(true)
  .argument('[args...]')
  .option('-p, --port <number>', 'Next.js dev server port', 3000)
  .action((_, { port }) => {
    if (isNaN(+port)) throw new Error(pc.red('--port must be a valid number'));
    process.env.PORT = +port;
    startDevServer();
  });

program.parse(process.argv);
