import { test, expect } from "@playwright/test";

test("valid user can login", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText("Products")).toBeVisible();
});

test("locked out user cannot login", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  await page.getByPlaceholder("Username").fill("locked_out_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Sorry, this user has been locked out."),
  ).toBeVisible();
});
