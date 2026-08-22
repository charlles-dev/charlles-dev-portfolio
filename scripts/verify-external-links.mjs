import { readFile } from "node:fs/promises";

const source = await readFile("src/lib/portfolio.ts", "utf8");
const urls = [...source.matchAll(/https:\/\/[^"'`\s]+/g)].map((match) => match[0]);
const uniqueUrls = [...new Set(urls)];
const failures = [];
const indeterminate = [];

for (const url of uniqueUrls) {
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
    if (response.status === 405 || response.status === 501) response = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
    if (response.status === 999) indeterminate.push(`${url} -> HTTP 999 (anti-bot response)`);
    else if (!response.ok) failures.push(`${url} -> HTTP ${response.status}`);
    else console.log(`✓ ${url} -> HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${url} -> ${error instanceof Error ? error.message : "request failed"}`);
  }
}

if (indeterminate.length > 0) {
  console.warn("External links requiring browser verification:");
  for (const item of indeterminate) console.warn(`- ${item}`);
}
if (failures.length > 0) {
  console.error("External link failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`✓ External links verified (${uniqueUrls.length - indeterminate.length} URLs; ${indeterminate.length} indeterminate)`);
