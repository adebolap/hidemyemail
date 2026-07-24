import { test, expect } from "@playwright/test";

test("finder completes to a shareable result", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("heading", { name: /Find the best camera settings/i }).waitFor();
  await page.getByRole("button", { name: "iPhone 16 Pro", exact: true }).click();
  await page.getByRole("button", { name: "photo", exact: true }).click();
  await page.getByRole("button", { name: /Night photography/i }).click();
  await page.getByRole("button", { name: /Night Outdoor or indoor/i }).click();
  await page.getByRole("button", { name: /Maximum quality/i }).click();
  await page.getByRole("button", { name: /See my settings/i }).click();
  await expect(page).toHaveURL(/iphone-16-pro\/night-photography/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Best settings for iPhone 16 Pro",
  );
  await expect(page.getByText(/High confidence/i).first()).toBeVisible();
});

test("copy settings button works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(
    "/iphone/iphone-16-pro/night-photography?lighting=night&output=maximum-quality&media=photo",
  );
  const copyButton = page.getByRole("button", { name: /Copy settings/i }).first();
  await copyButton.click();
  await expect(page.getByRole("button", { name: /Copied/i }).first()).toBeVisible();
});

test("newsletter validation states", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Email" }).fill("not-an-email");
  await page.getByRole("button", { name: /Subscribe/i }).click();
  await expect(page.getByText(/valid email|agree to receive/i).first()).toBeVisible();
});

test("keyboard can move through finder controls", async ({ page }) => {
  await page.goto("/#finder");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
});
