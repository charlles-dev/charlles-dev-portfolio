import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://www.charlles.dev";
const pages = [
  { locale: "pt-BR", route: "/pt-BR", file: ".next/server/app/pt-BR.html", type: "website" },
  { locale: "en", route: "/en", file: ".next/server/app/en.html", type: "website" },
  { locale: "es", route: "/es", file: ".next/server/app/es.html", type: "website" },
  { locale: "pt-BR", route: "/pt-BR/engineering", file: ".next/server/app/pt-BR/engineering.html", type: "article" },
  { locale: "en", route: "/en/engineering", file: ".next/server/app/en/engineering.html", type: "article" },
  { locale: "es", route: "/es/engineering", file: ".next/server/app/es/engineering.html", type: "article" },
];
const expectedPaths = new Set([...pages.map((page) => page.route), "/api/projects", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]);
const failures = [];

for (const page of pages) {
  const html = await readFile(path.join(root, page.file), "utf8");
  const htmlLang = html.match(/<html\b[^>]*\blang="([^"]+)"/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
  const ogType = html.match(/<meta\s+property="og:type"\s+content="([^"]+)"/)?.[1];
  const twitterCard = html.match(/<meta\s+name="twitter:card"\s+content="([^"]+)"/)?.[1];
  const skipTargetCount = [...html.matchAll(/id="conteudo"/g)].length;

  if (htmlLang !== page.locale) failures.push(`${page.route}: expected lang=${page.locale}, got ${htmlLang ?? "missing"}`);
  if (!description) failures.push(`${page.route}: missing meta description`);
  if (canonical !== `${baseUrl}${page.route}`) failures.push(`${page.route}: invalid canonical`);
  if (ogType !== page.type) failures.push(`${page.route}: expected og:type=${page.type}, got ${ogType ?? "missing"}`);
  if (twitterCard !== "summary_large_image") failures.push(`${page.route}: missing Twitter card`);
  if (skipTargetCount !== 1) failures.push(`${page.route}: expected exactly one #conteudo target, got ${skipTargetCount}`);

  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/")) continue;
    const pathname = new URL(href, baseUrl).pathname;
    if (!expectedPaths.has(pathname)) failures.push(`${page.route}: internal link has no expected route: ${href}`);
  }
}

await access(path.join(root, ".next", "server", "app", "sitemap.xml.body"));
await access(path.join(root, ".next", "server", "app", "robots.txt.body"));

if (failures.length > 0) {
  console.error("HTML integrity failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`✓ HTML integrity verified (${pages.length} pages)`);
