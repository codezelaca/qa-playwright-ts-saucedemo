# Playwright Basics

Playwright is a browser automation framework. It can open real browsers, click buttons, fill forms, check text, and verify page behavior.

## Core Terms

| Term | Meaning |
| --- | --- |
| Test runner | The tool that finds and runs test files |
| Test | One automated check for one behavior |
| Browser | Chromium, Firefox, or WebKit |
| Page | A browser tab controlled by Playwright |
| Locator | A way to find an element on the page |
| Assertion | A check that confirms the expected result |
| Trace | A recorded timeline of the test steps |
| Report | A readable result page after tests run |

## Test File Naming

Playwright looks for files such as:

```text
tests/saucedemo-login.spec.ts
```

The `.spec.ts` ending means this file contains tests.

## Basic Test Shape

```ts
test("valid user can login", async ({ page }) => {
  await page.goto("https://saucedemo.com");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
```

Every good test has three parts:

| Part | Meaning | Example |
| --- | --- | --- |
| Arrange | Prepare the page and data | Open the login page |
| Act | Perform the user action | Fill username, fill password, click login |
| Assert | Check the result | URL contains `inventory` |

## The `test` Function

```ts
test("locked out user cannot login", async ({ page }) => {});
```

The first value is the test name. Make it readable because it appears in reports.

The second value is the test body. It is `async` because Playwright actions use `await`.

## The `page` Object

`page` is the browser tab.

Common page actions:

```ts
await page.goto("https://saucedemo.com");
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByRole("button", { name: "Login" }).click();
await page.screenshot({ path: "screenshot.png" });
```

## Assertions With `expect`

Assertions prove that the expected result happened.

```ts
await expect(page).toHaveURL(/inventory/);
await expect(page.getByText("Products")).toBeVisible();
await expect(page.getByText("Sorry, this user has been locked out.")).toBeVisible();
```

Common assertions:

| Assertion | Use |
| --- | --- |
| `toBeVisible()` | Element is visible |
| `toHaveText()` | Element has exact or matching text |
| `toContainText()` | Element includes text |
| `toHaveURL()` | Page URL matches expectation |
| `toHaveTitle()` | Page title matches expectation |
| `toBeEnabled()` | Button or input can be used |
| `toBeDisabled()` | Button or input cannot be used |

## Playwright Config

The file `playwright.config.ts` controls how tests run.

Important settings in this repo:

| Setting | Meaning |
| --- | --- |
| `testDir: "./tests"` | Tests are stored in the `tests` folder |
| `fullyParallel: true` | Test files can run in parallel |
| `forbidOnly: !!process.env.CI` | CI fails if `test.only` is committed |
| `retries: process.env.CI ? 2 : 0` | Failed tests retry on CI |
| `reporter: "html"` | Playwright creates an HTML report |
| `trace: "on-first-retry"` | Trace is collected on the first retry |
| `projects` | Tests run in Chromium, Firefox, and WebKit |

## Browser Projects

This repo runs tests in:

| Project | Browser family |
| --- | --- |
| `chromium` | Chrome-like browser |
| `firefox` | Firefox browser |
| `webkit` | Safari-like browser |

Run one project:

```bash
npm run test:chromium
```

## Reports

After running tests, open the report:

```bash
npm run report
```

The report shows:

| Report item | Why it helps |
| --- | --- |
| Passed tests | Confirms working scenarios |
| Failed tests | Shows broken scenarios |
| Error message | Explains what Playwright expected |
| Trace link | Lets you inspect test steps |
| Screenshots and videos | Useful when enabled or captured |

## UI Mode

UI mode is useful for learning because it shows tests, steps, and browser actions.

```bash
npm run test:ui
```

Use it when:

| Situation | Why UI mode helps |
| --- | --- |
| Learning a new test | You can watch each step |
| Debugging a locator | You can inspect matching elements |
| Understanding failures | You can replay what happened |

## Debug Mode

Debug mode pauses the test and lets you step through actions.

```bash
npm run test:debug
```

Use it when the test fails and the report alone is not enough.

## Codegen

Codegen records your browser actions and suggests locators.

```bash
npm run codegen
```

Codegen is helpful, but do not copy everything blindly. Clean the generated code so the test remains readable.

## Best Practices

| Practice | Reason |
| --- | --- |
| Use readable test names | Reports become easier to understand |
| Keep one behavior per test | Failures are easier to diagnose |
| Prefer user-facing locators | Tests become closer to real user behavior |
| Avoid hard waits | Playwright already auto-waits for locators |
| Assert the final result | Clicking is not enough; verify what changed |
| Keep repeated data in constants or objects | Reduces duplication |

## Student Exercise

Add a test for an invalid username and password. Expected result: Sauce Demo shows an error message and does not open the inventory page.
