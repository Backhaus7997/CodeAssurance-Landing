import { expect, test, type Page } from "@playwright/test";

const FORMSPREE = "https://formspree.io/**";

async function fillValid(page: Page) {
  const form = page.getByTestId("contact-form");
  await form.getByLabel("Name").fill("Dana Lee");
  await form.getByLabel("Work email").fill("cto@acme.com");
  await form.getByLabel("Company").fill("Acme");
  await form.getByLabel(/Phone/).fill("+1 (415) 555-0100");
  await form.getByLabel("What do you need?").fill("We need regression coverage before launch.");
  return form;
}

test.describe("contact form", () => {
  test("an empty submission shows inline errors and sends nothing", async ({ page }) => {
    let requests = 0;
    await page.route(FORMSPREE, (route) => {
      requests++;
      return route.fulfill({ status: 200, body: "{}" });
    });
    await page.goto("/");
    const form = page.getByTestId("contact-form");
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByText("Please fill this in.").first()).toBeVisible();
    expect(requests).toBe(0);
  });

  test("a rejected submission explains it, offers the email and keeps the text", async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: "Server error" }));
    await page.goto("/");
    const form = await fillValid(page);
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByText("The message wasn't accepted.")).toBeVisible();
    await expect(form.getByRole("link", { name: "martin.backhaus@code-assurance.com" })).toHaveAttribute(
      "href",
      "mailto:martin.backhaus@code-assurance.com",
    );
    await expect(form.getByLabel("What do you need?")).toHaveValue("We need regression coverage before launch.");
  });

  test("a network failure says so", async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.abort("internetdisconnected"));
    await page.goto("/");
    const form = await fillValid(page);
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(form.getByText("We couldn't reach the server. Check your connection.")).toBeVisible();
  });

  test("a successful submission sends once and confirms, phone format included", async ({ page }) => {
    const bodies: string[] = [];
    await page.route(FORMSPREE, async (route) => {
      bodies.push(route.request().postData() ?? "");
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto("/");
    const form = await fillValid(page);
    const send = form.getByRole("button", { name: /Send message|Sending/ });
    await send.click();
    await expect(send).toBeDisabled();
    await send.click({ force: true });
    await expect(page.getByText("Message sent")).toBeVisible();
    expect(bodies).toHaveLength(1);
    expect(bodies[0]).toContain("+1 (415) 555-0100");
  });

  test("without a booking page the start section offers email", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('#start a[href="mailto:martin.backhaus@code-assurance.com"]').first()).toBeVisible();
    await expect(page.locator("#start a[data-booking]")).toHaveCount(0);
  });

  test("the Spanish form speaks Spanish", async ({ page }) => {
    await page.goto("/es/");
    const form = page.getByTestId("contact-form");
    await form.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(form.getByText("Completá este campo.").first()).toBeVisible();
  });
});
