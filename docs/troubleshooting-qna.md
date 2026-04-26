# Troubleshooting Q&A

This guide answers common questions students face when starting Playwright, TypeScript, and QA automation.

## Setup Issues

### Q: `npm install` fails. What should I do?

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

Use a current Node.js LTS version. Then try again:

```bash
npm install
```

If the issue continues, delete `node_modules` and `package-lock.json` only when your instructor asks you to reset dependencies. In normal work, keep `package-lock.json` committed.

### Q: Playwright says browsers are missing.

Install the browsers:

```bash
npx playwright install
```

Then run:

```bash
npm test
```

### Q: `playwright` command is not found.

Use the npm scripts:

```bash
npm test
```

Or use `npx`:

```bash
npx playwright test
```

Do not install Playwright globally for this repo. Project dependencies should stay inside the repo.

## Test Run Issues

### Q: The test fails because the page did not load.

Check your internet connection and open the site manually:

```text
https://saucedemo.com
```

If the site is down or blocked by the network, the test cannot pass because it depends on that public practice site.

### Q: The valid login test fails.

Check these values:

```ts
username: "standard_user"
password: "secret_sauce"
```

Then run headed mode:

```bash
npm run test:headed
```

Watch whether the username, password, and login click happen correctly.

### Q: The locked-out user test fails.

Check the expected error text:

```text
Sorry, this user has been locked out.
```

If the website changes its message, update the assertion to match the real user-visible error.

### Q: Why do tests run in three browsers?

The config includes Chromium, Firefox, and WebKit. Real users use different browser engines, so cross-browser testing helps catch browser-specific problems.

Run only one browser while learning:

```bash
npm run test:chromium
```

### Q: Why did a test pass once and fail later?

That is usually called a flaky test. Common causes:

| Cause | Fix |
| --- | --- |
| Weak locator | Use a clearer role, label, placeholder, text, or test ID locator |
| Missing assertion | Wait for a real expected result |
| Slow network | Let Playwright wait for locators or page state |
| Shared test data | Keep tests independent |
| Hard wait | Replace `waitForTimeout` with a locator or assertion |

## TypeScript Issues

### Q: Why do we use `await` everywhere?

Browser actions take time. `await` tells TypeScript and Playwright to wait until the action is complete.

Correct:

```ts
await page.getByRole("button", { name: "Login" }).click();
```

Wrong:

```ts
page.getByRole("button", { name: "Login" }).click();
```

### Q: What does `async ({ page }) => {}` mean?

It means the test function is asynchronous and receives Playwright fixtures. In this repo, the important fixture is `page`, which represents a browser tab.

```ts
test("valid user can login", async ({ page }) => {
  await page.goto("https://saucedemo.com");
});
```

### Q: What is the difference between `const` and `let`?

Use `const` when the variable will not be reassigned. Use `let` when it must change.

```ts
const username = "standard_user";

let attempts = 0;
attempts = attempts + 1;
```

For tests, most values should be `const`.

### Q: What is an object?

An object groups related values:

```ts
const validUser = {
  username: "standard_user",
  password: "secret_sauce",
};
```

Use it like this:

```ts
validUser.username;
validUser.password;
```

## Locator Issues

### Q: How do I know which selector to use?

Use this order:

1. Role
2. Label
3. Placeholder
4. Text
5. Test ID
6. CSS
7. XPath

For example:

```ts
page.getByRole("button", { name: "Login" });
```

is better than:

```ts
page.locator("#login-button");
```

when the button is clearly accessible by role and name.

### Q: Should I use XPath?

Use XPath only when there is no cleaner locator. XPath is powerful, but it is usually harder to read and easier to break.

### Q: Codegen generated a different selector. Is that wrong?

Not always. Codegen gives suggestions. You still need to choose the most readable and stable locator.

Good generated code should be cleaned before committing.

## Debugging Issues

### Q: How do I see what the browser is doing?

Run:

```bash
npm run test:headed
```

### Q: How do I debug step by step?

Run:

```bash
npm run test:debug
```

### Q: How do I inspect failures after the run?

Open the report:

```bash
npm run report
```

If traces are available, open the trace from the report.

### Q: What should I read first in an error?

Read these parts in order:

1. Test name
2. Failed line number
3. Expected value
4. Received value
5. Locator or assertion that failed

The failed line number usually points directly to the problem.

## QA Thinking

### Q: Why do we test invalid users?

Because real software must handle both successful and unsuccessful actions. A login page should accept valid users and reject blocked or invalid users.

### Q: What makes a good test?

A good test is:

| Quality | Meaning |
| --- | --- |
| Readable | Another student can understand it |
| Focused | It checks one behavior |
| Reliable | It passes and fails for the right reasons |
| Independent | It does not depend on another test first |
| Assertive | It checks the final result, not only the action |

### Q: What should I do before asking for help?

Before asking for help, collect:

1. The command you ran
2. The full error message
3. The test name that failed
4. The failed line number
5. Whether headed mode shows the same issue

This makes debugging much faster.

## Practice Questions

### Q: What is the difference between an action and an assertion?

An action does something:

```ts
await page.getByRole("button", { name: "Login" }).click();
```

An assertion checks something:

```ts
await expect(page.getByText("Products")).toBeVisible();
```

### Q: Why is this better than a hard wait?

```ts
await expect(page.getByText("Products")).toBeVisible();
```

Because it waits for the real result the user needs. A hard wait only waits for time to pass.

### Q: What is the first thing you should check when a locator fails?

Check whether the element still exists on the page and whether the text, role, placeholder, or attribute changed.
