# Selectors And Locators

A locator tells Playwright how to find an element on the page. Good locators make tests readable and stable. Bad locators make tests flaky.

## Locator Priority

Use this order when choosing locators:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. CSS selectors
7. XPath only when there is no better option

This order favors locators that describe how users understand the page.

## `getByRole`

Use role locators for buttons, links, checkboxes, headings, and other accessible elements.

```ts
await page.getByRole("button", { name: "Login" }).click();
```

Why this is good:

| Reason | Benefit |
| --- | --- |
| Reads like a user action | Click the Login button |
| Uses accessibility information | Encourages better UI quality |
| Stable when layout changes | Does not depend on CSS structure |

Common roles:

| Role | Example |
| --- | --- |
| `button` | Login button |
| `link` | Navigation link |
| `heading` | Page heading |
| `textbox` | Text input |
| `checkbox` | Checkbox |
| `option` | Dropdown option |

## `getByPlaceholder`

Use placeholder locators when an input has useful placeholder text.

```ts
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
```

This is useful in Sauce Demo because the login inputs have clear placeholders.

## `getByText`

Use text locators when checking visible messages.

```ts
await expect(page.getByText("Products")).toBeVisible();
await expect(page.getByText("Sorry, this user has been locked out.")).toBeVisible();
```

Use `getByText` carefully. If the same text appears multiple times, make the locator more specific.

## `getByLabel`

Use label locators when inputs have accessible labels.

```ts
await page.getByLabel("Email").fill("student@example.com");
```

This is one of the best options for forms when the application uses labels correctly.

## `getByTestId`

Test IDs are attributes added for testing. Playwright uses `data-testid` by default.

```html
<button data-testid="login-button">Login</button>
```

```ts
await page.getByTestId("login-button").click();
```

Sauce Demo uses `data-test`, not `data-testid`. If a project wants to use `getByTestId` with `data-test`, configure it in `playwright.config.ts`:

```ts
use: {
  testIdAttribute: "data-test",
}
```

Then this works:

```ts
await page.getByTestId("login-button").click();
```

For this beginner repo, the current tests use placeholder, role, and text locators because they are easy to understand first.

## CSS Selectors

CSS selectors find elements by CSS syntax.

```ts
await page.locator("#user-name").fill("standard_user");
await page.locator(".submit-button").click();
await page.locator("[data-test='login-button']").click();
```

CSS selectors are useful, but they can become too tied to implementation details.

Good CSS selector:

```ts
page.locator("[data-test='login-button']");
```

Weak CSS selector:

```ts
page.locator("div:nth-child(2) > form > input:nth-child(1)");
```

The weak selector breaks easily when the HTML layout changes.

## XPath

XPath is another way to find elements.

```ts
await page.locator("//button[text()='Login']").click();
```

Avoid XPath when a role, label, placeholder, text, test ID, or CSS selector can do the job. XPath is harder for beginners to read and often becomes brittle.

## Chaining Locators

You can find an element inside another element.

```ts
const productList = page.locator(".inventory_list");
await expect(productList.getByText("Sauce Labs Backpack")).toBeVisible();
```

This helps when the same text appears in multiple sections.

## Filtering Locators

Use filters to narrow down matches.

```ts
await page
  .getByRole("button")
  .filter({ hasText: "Login" })
  .click();
```

Prefer the simpler form when possible:

```ts
await page.getByRole("button", { name: "Login" }).click();
```

## Auto-Waiting

Playwright locators auto-wait. This means Playwright waits for elements to be ready before acting.

```ts
await page.getByRole("button", { name: "Login" }).click();
```

Do not add hard waits like this:

```ts
await page.waitForTimeout(5000);
```

Hard waits make tests slower and still do not guarantee stability. Prefer assertions and locators.

## Locator Mistakes

| Mistake | Problem | Better approach |
| --- | --- | --- |
| Using long XPath for everything | Hard to read and brittle | Use role, label, text, or test ID |
| Using CSS classes from styling | Styling changes break tests | Use user-facing locators or test IDs |
| Using text that appears many times | Locator matches the wrong element | Scope or filter the locator |
| Clicking without asserting result | Test may pass after a useless click | Assert URL, text, state, or visibility |
| Using `waitForTimeout` | Slow and flaky | Wait for real page state |

## Selector Examples For Sauce Demo

| Page element | Locator example |
| --- | --- |
| Username input | `page.getByPlaceholder("Username")` |
| Password input | `page.getByPlaceholder("Password")` |
| Login button | `page.getByRole("button", { name: "Login" })` |
| Products heading/text | `page.getByText("Products")` |
| Locked-out error | `page.getByText("Sorry, this user has been locked out.")` |

## Student Exercise

Run codegen:

```bash
npm run codegen
```

Log in to Sauce Demo and compare generated locators with the locators used in `tests/saucedemo-login.spec.ts`. Pick the most readable locator for each action.
