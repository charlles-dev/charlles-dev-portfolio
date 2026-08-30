import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('src');
const globalStyles = path.join(sourceRoot, 'styles', 'globals.css');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else if (entry.isFile() && entry.name.endsWith('.css')) files.push(target);
  }
  return files;
}

for (const file of await walk(sourceRoot)) {
  if (file === globalStyles) continue;
  const current = await readFile(file, 'utf8');
  const usesTailwind = current.includes('@import "tailwindcss";') || current.includes('@apply ');
  if (!usesTailwind && !current.includes('styles/globals.css')) continue;

  const relative = path.relative(path.dirname(file), globalStyles).replaceAll('\\', '/');
  const reference = `@reference "${relative.startsWith('.') ? relative : `./${relative}`}";`;
  let next = current
    .replace(/^@import "tailwindcss";\r?\n?/m, '')
    .replace(/^@import ["'][^"']*styles\/globals\.css["'];\r?\n?/m, '');

  if (!next.startsWith('@reference ')) next = `${reference}\n${next}`;
  await writeFile(file, next, 'utf8');
}

console.log('Tailwind v4 component styles now reference the single global stylesheet.');
