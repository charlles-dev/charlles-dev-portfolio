import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, ".next", "prerender-manifest.json");
const expectedRoutes = [
  "/pt-BR",
  "/en",
  "/es",
  "/pt-BR/engineering",
  "/en/engineering",
  "/es/engineering",
  "/pt-BR/now",
  "/en/now",
  "/es/now",
  "/pt-BR/process",
  "/en/process",
  "/es/process",
];

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const missing = expectedRoutes.filter((route) => !manifest.routes?.[route]);

if (missing.length > 0) {
  console.error("Missing prerendered routes:");
  for (const route of missing) console.error(`- ${route}`);
  process.exit(1);
}

console.log(`✓ Routes verified (${expectedRoutes.length} localized pages)`);
