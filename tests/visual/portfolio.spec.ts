import { expect, test } from "@playwright/test";

const locales = ["pt-BR", "en", "es"] as const;
const routes = ["", "/cv", "/projects/charlles-dev-portfolio", "/projects/astrolink", "/projects/trakr"] as const;

for (const locale of locales) {
  for (const route of routes) {
    test(`${locale}${route || "/home"} renders without visual overflow`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
      const consoleErrors: string[] = [];
      page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
      await page.goto(`/${locale}${route}`, { waitUntil: "networkidle" });
      await expect(page.locator("h1").first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      expect(consoleErrors).toEqual([]);
      await expect(page).toHaveScreenshot(`${locale}-${route.replaceAll("/", "-") || "home"}.png`, { fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.02 });
      await testInfo.attach("route", { body: `/${locale}${route}`, contentType: "text/plain" });
    });
  }
}

test("context menu and logo easter egg remain optional shortcuts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pt-BR", { waitUntil: "networkidle" });
  const aboutTitle = page.locator(".portfolio-about-section h2");
  await aboutTitle.scrollIntoViewIfNeeded();
  await aboutTitle.click({ button: "right", force: true });
  await expect(page.getByRole("menu", { name: "Atalhos do Charlles.dev" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu", { name: "Atalhos do Charlles.dev" })).toBeHidden();
  for (let index = 0; index < 5; index += 1) await page.locator(".reference-brand").click();
  await expect(page.getByText("DEV MODE // 5 cliques confirmados")).toBeVisible();
});

test("the public game route exposes only the localized Entre Camadas experience", async ({ page }) => {
  const localizedTitles = {
    "pt-BR": ["ENTRE", "CAMADAS"],
    en: ["BETWEEN", "LAYERS"],
    es: ["ENTRE", "CAPAS"],
  } as const;

  for (const locale of locales) {
    await page.goto(`/${locale}/game`, { waitUntil: "networkidle" });
    await expect(page).toHaveURL(new RegExp(`/${locale}/game/world/?$`));
    const game = page.frameLocator('iframe[title]');
    await expect(game.locator("#game-title span")).toHaveText([...localizedTitles[locale]]);
  }
});
