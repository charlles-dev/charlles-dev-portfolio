import { spawnSync } from "node:child_process";

const checks = [
  ["type-check", "pnpm exec tsc --noEmit"],
  ["lint", "pnpm exec eslint ."],
  ["tests", "pnpm exec vitest run"],
  ["production build", "pnpm exec next build"],
  ["asset references", "pnpm exec node scripts/verify-assets.mjs"],
  ["generated routes", "pnpm exec node scripts/verify-routes.mjs"],
];

for (const [name, command] of checks) {
  console.log(`\n▶ ${name}`);
  const result = spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\n✓ Landing quality gate passed");
