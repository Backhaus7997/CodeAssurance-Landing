import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

// md5 of the favicon.ico that ships with the Next.js template.
const TEMPLATE_FAVICON_MD5 = "c30c7d42707a47a3f4591831641e50dc";

const HOMES = [
  ["/", "en"],
  ["/es/", "es"],
] as const;

for (const [path, lang] of HOMES) {
  test(`${path} declares lang="${lang}" with one html element and one h1`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    expect(await page.evaluate(() => document.querySelectorAll("html").length)).toBe(1);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  for (const width of [360, 375, 1280]) {
    test(`${path} has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

test("uses the Code Assurance shield as the favicon", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('link[rel~="icon"]').evaluateAll((links) => links.map((l) => l.getAttribute("href") ?? ""));
  expect(hrefs.some((h) => h.includes("icon.svg"))).toBe(true);

  const ico = await request.get("/favicon.ico");
  expect(ico.ok()).toBe(true);
  expect(createHash("md5").update(await ico.body()).digest("hex")).not.toBe(TEMPLATE_FAVICON_MD5);
});

test("shows no booking button when no booking URL is configured", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[data-booking]")).toHaveCount(0);
});

test("serves the site 404 for unknown URLs", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page doesn't exist" })).toBeVisible();
});
