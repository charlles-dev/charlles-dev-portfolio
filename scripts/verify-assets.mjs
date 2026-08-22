import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoots = [path.join(root, "src")];
const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const assetPattern = /["'`]((?:\/assets|\/reference)\/[A-Za-z0-9._/-]+\.[A-Za-z0-9]+)(?:\?[^"'`]*)?["'`]/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(entryPath));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(entryPath);
  }
  return files;
}

const referenced = new Set();
for (const sourceRoot of sourceRoots) {
  for (const filePath of await walk(sourceRoot)) {
    const source = await readFile(filePath, "utf8");
    for (const match of source.matchAll(assetPattern)) referenced.add(match[1]);
  }
}

const missing = [];
for (const asset of [...referenced].sort()) {
  try {
    const assetPath = path.join(root, "public", asset.slice(1));
    const assetStat = await stat(assetPath);
    if (!assetStat.isFile()) missing.push(asset);
  } catch {
    missing.push(asset);
  }
}

if (missing.length > 0) {
  console.error("Missing referenced assets:");
  for (const asset of missing) console.error(`- ${asset}`);
  process.exit(1);
}

console.log(`✓ Asset references verified (${referenced.size} files)`);
