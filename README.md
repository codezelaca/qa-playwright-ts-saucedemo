# QA Playwright TypeScript Sauce Demo

A beginner-friendly QA automation learning repo for students of [Codezela Career Accelerator](https://cca.it.com). This project uses Playwright, TypeScript, and the public Sauce Demo practice website to teach how browser automation tests are written, run, debugged, and maintained.

The goal is not only to run tests. The goal is to understand the TypeScript basics, Playwright concepts, selectors, assertions, reports, debugging tools, and common issues students face when starting automation.

## What You Will Learn

| Area | What this repo teaches |
| --- | --- |
| TypeScript basics | Imports, constants, objects, functions, async/await, types, and test data |
| Playwright basics | `test`, `expect`, `page`, browser projects, config, reports, and traces |
| Selectors and locators | Role locators, placeholder locators, text locators, test IDs, CSS, XPath, and when to use each |
| Test writing | Arrange, act, assert flow for login scenarios |
| Debugging | Headed mode, UI mode, debug mode, traces, screenshots, and reports |
| Real QA thinking | Positive tests, negative tests, expected errors, stability, and readable test names |

## Project Structure

```text
qa-playwright-ts-saucedemo/
├── docs/
│   ├── playwright-basics.md
│   ├── selectors-and-locators.md
│   ├── troubleshooting-qna.md
│   └── typescript-basics.md
├── tests/
│   └── saucedemo-login.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```

## Prerequisites

Install these before starting:

1. Node.js LTS
2. npm, which comes with Node.js
3. VS Code or another code editor
4. Git

Check your versions:

```bash
node --version
npm --version
git --version
```

## Setup

Install project dependencies:

```bash
npm install
```

Install Playwright browsers if they are not already installed:

```bash
npx playwright install
```

## Run Tests

Run every test in every configured browser:

```bash
npm test
```

Run only Chromium:

```bash
npm run test:chromium
```

Run with the browser visible:

```bash
npm run test:headed
```

Run with Playwright UI mode:

```bash
npm run test:ui
```

Debug step by step:

```bash
npm run test:debug
```

Open the latest HTML report:

```bash
npm run report
```

Generate locators by recording browser actions:

```bash
npm run codegen
```

## Current Test Scenarios

The file `tests/saucedemo-login.spec.ts` contains two login tests:

| Test | Purpose |
| --- | --- |
| `valid user can login` | Checks that a valid user can log in and see the Products page |
| `locked out user cannot login` | Checks that a locked-out user sees the correct error message |

These two tests teach an important QA rule: a good test suite should include happy paths and negative paths.

## How The Test File Works

```ts
import { test, expect } from "@playwright/test";
```

This imports Playwright's test runner and assertion library.

```ts
const websiteLink = "https://saucedemo.com";
```

This stores the website URL in one reusable constant.

```ts
const validUser = {
  username: "standard_user",
  password: "secret_sauce",
};
```

This creates an object for test data. Objects keep related values together.

```ts
test("valid user can login", async ({ page }) => {
  await page.goto(websiteLink);
});
```

This creates a test. The `page` object is a browser tab. `async` and `await` are used because browser actions take time.

```ts
await expect(page).toHaveURL(/inventory/);
```

This is an assertion. It checks that the browser URL contains `inventory` after login.

## Learning Path

Follow this order if you are new:

1. Read this README.
2. Read [TypeScript Basics](docs/typescript-basics.md).
3. Read [Playwright Basics](docs/playwright-basics.md).
4. Read [Selectors and Locators](docs/selectors-and-locators.md).
5. Run `npm run test:headed`.
6. Run `npm run test:ui`.
7. Read [Troubleshooting Q&A](docs/troubleshooting-qna.md).
8. Add one new test for another Sauce Demo user or page.

## Good Student Practices

Use clear test names:

```ts
test("locked out user cannot login", async ({ page }) => {});
```

Keep test data readable:

```ts
const lockedOutUser = {
  username: "locked_out_user",
  password: "secret_sauce",
};
```

Prefer user-facing locators:

```ts
page.getByRole("button", { name: "Login" });
```

Write one test for one behavior. Do not put every website action into one large test.

## Common Commands

| Command | Meaning |
| --- | --- |
| `npm install` | Install project dependencies |
| `npx playwright install` | Install browser binaries |
| `npm test` | Run all tests |
| `npm run test:chromium` | Run tests only in Chromium |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:debug` | Debug test step by step |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the HTML report |
| `npm run codegen` | Record actions and generate locators |

## When A Test Fails

Use this order:

1. Read the terminal error.
2. Open the HTML report with `npm run report`.
3. Run the failing test in headed mode.
4. Use `npm run test:debug` to step through the test.
5. Check whether the locator still matches the page.
6. Check whether the expected text, URL, or page state changed.

More examples are in [Troubleshooting Q&A](docs/troubleshooting-qna.md).

## About Codezela Career Accelerator

This learning repo is provided by [Codezela Career Accelerator](https://cca.it.com) for students learning QA automation with TypeScript and Playwright.
