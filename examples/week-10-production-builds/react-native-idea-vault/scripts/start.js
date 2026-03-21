#!/usr/bin/env node

const { spawn } = require('node:child_process');

const extraArgs = process.argv.slice(2);

console.log('\nReact Native Idea Vault');
console.log('Metro is the JavaScript bundler for this native app.');
console.log('If you open http://localhost:8081 in a browser, Metro will show its own welcome page, not the Idea Vault UI.');
console.log('Launch the app on a device or simulator with `npm run android` or `npm run ios`.');
console.log('If you need a browser-based version for class demos, use `../expo-idea-vault` instead.\n');

const metro = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['react-native', 'start', ...extraArgs],
  {
    stdio: 'inherit',
    shell: false,
  },
);

metro.on('exit', code => {
  process.exit(code ?? 0);
});

metro.on('error', error => {
  console.error('Failed to start Metro:', error);
  process.exit(1);
});
