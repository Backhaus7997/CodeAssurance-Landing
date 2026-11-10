import { expect, test } from "@playwright/test";

const PAGES = [
  ["/services/automated-testing/", "en", "Test automation services"],
  ["/services/performance-audit/", "en", "Performance testing and audit services"],
  ["/services/security-review/", "en", "Security testing services"],
  ["/services/code-quality/", "en", "Code quality review services"],
  ["/es/services/automated-testing/", "es", "Servicios de automatización de pruebas"],
  ["/es/services/performance-audit/", "es", "Servicios de pruebas y auditoría de performance"],
  ["/es/services/security-review/", "es", "Servicios de pruebas de seguridad"],
  ["/es/services/code-quality/", "es", "Servicios de revisión de calidad de código"],
] as const;

for (const [path, lang, title] of PAGES) {
  test(`${path} renders its service page`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.getByTestId("faq").locator("details")).toHaveCount(8);
    await expect(page.getByTestId("answer")).toBeVisible();
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((block) => {
      const data = JSON.parse(block);
      return (Array.isArray(data) ? data : [data]).map((node: { "@type": string }) => node["@type"]);
    });
    expect(types).toEqual(expect.arrayContaining(["Service", "FAQPage", "BreadcrumbList"]));
  });
}

test("how it works opens with the keyboard", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari tabs only between form fields unless Option+Tab is used");
  await page.goto("/services/performance-audit/");
  const first = page.getByTestId("service-how").locator("details").nth(1);
  await first.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("open", "");
});

test("tools are presented as examples", async ({ page }) => {
  await page.goto("/services/automated-testing/");
  await expect(page.getByRole("heading", { name: "Tools we often use (examples)" })).toBeVisible();
});

const NEW_PAGES = [
  ["/services/manual-qa-testing/", "Manual QA testing services"],
  ["/services/dedicated-qa-engineers/", "Dedicated QA engineers for your team"],
  ["/services/ai-qa-agent/", "AI QA agent for your test suite"],
  ["/services/mobile-app-testing/", "Mobile app testing services for Android and iOS"],
  ["/services/api-testing/", "API testing services"],
] as const;

for (const [path, title] of NEW_PAGES) {
  test(`${path} renders its English-only service page`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.getByTestId("answer")).toBeVisible();
    expect(await page.getByTestId("faq").locator("details").count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveCount(0);
  });
}

test("/services/ lists all nine services", async ({ page }) => {
  const res = await page.goto("/services/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("QA services");
  const hrefs = await page.getByTestId("hub-list").locator("a").evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  expect(hrefs.sort()).toEqual(
    [
      "automated-testing",
      "performance-audit",
      "security-review",
      "code-quality",
      "manual-qa-testing",
      "dedicated-qa-engineers",
      "ai-qa-agent",
      "mobile-app-testing",
      "api-testing",
    ]
      .map((slug) => `/services/${slug}/`)
      .sort(),
  );
});
