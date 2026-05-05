import { test, expect } from "@playwright/test";

test("valid user can login and see products page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');

  await usernameInput.fill("standard_user");
  await passwordInput.fill("secret_sauce");
  await loginButton.click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.screenshot({
    path: "screenshots/login-success.png",
    fullPage: true,
  });
});

test("invalid user cannot login and sees error message", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="username"]').fill("wrong_user");
  await page.locator('[data-test="password"]').fill("wrong_password");
  await page.locator('[data-test="login-button"]').click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(
    "Username and password do not match",
  );
  await expect(page).not.toHaveURL(/inventory/);
});

test("user cannot login without username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText("Username is required");
  await expect(page).not.toHaveURL(/inventory/);
});
