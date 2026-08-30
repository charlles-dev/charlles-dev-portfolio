import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = path.resolve(projectRoot, '..');
const allowedParent = path.join(workspaceRoot, 'public', 'game');
const target = path.join(allowedParent, 'original');

if (path.dirname(target) !== allowedParent || path.basename(target) !== 'original') {
  throw new Error(`Refusing to clean an unsafe output path: ${target}`);
}

await rm(target, { recursive: true, force: true });
console.log(`Cleaned generated game output: ${target}`);
