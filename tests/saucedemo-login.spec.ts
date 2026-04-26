import { test, expect } from "@playwright/test";

const websiteLink = "https://saucedemo.com";

const validUser = {
  username: "standard_user",
  password: "secret_sauce",
};

const lockedOutUser = {
  username: "locked_out_user",
  password: "secret_sauce",
};

test("valid user can login", async ({ page }) => {
  await page.goto(websiteLink);

  await page.getByPlaceholder("Username").fill(validUser.username);
  await page.getByPlaceholder("Password").fill(validUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText("Products")).toBeVisible();
});

test("locked out user cannot login", async ({ page }) => {
  await page.goto(websiteLink);

  await page.getByPlaceholder("Username").fill(lockedOutUser.username);
  await page.getByPlaceholder("Password").fill(lockedOutUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Sorry, this user has been locked out."),
  ).toBeVisible();
});
