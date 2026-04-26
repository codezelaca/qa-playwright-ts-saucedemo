# TypeScript Basics For This Repo

TypeScript is JavaScript with extra rules that help catch mistakes before code runs. Playwright tests can be written in TypeScript, so learning the basics makes the test code easier to read and maintain.

## Imports

An import brings code from another file or package into the current file.

```ts
import { test, expect } from "@playwright/test";
```

In this repo:

| Imported item | Meaning |
| --- | --- |
| `test` | Creates and runs a Playwright test |
| `expect` | Makes assertions about the browser or page |

The curly braces mean we are importing named exports from the Playwright package.

## Constants

Use `const` when a value should not be reassigned.

```ts
const websiteLink = "https://saucedemo.com";
```

Good uses for `const`:

| Use case | Example |
| --- | --- |
| Website URL | `const websiteLink = "https://saucedemo.com";` |
| Login username | `const username = "standard_user";` |
| Expected page title | `const expectedTitle = "Products";` |

Prefer `const` by default. Use `let` only when the value must change.

```ts
let retryCount = 0;
retryCount = retryCount + 1;
```

Avoid `var` in modern TypeScript.

## Strings, Numbers, And Booleans

```ts
const username = "standard_user"; // string
const maxRetries = 2; // number
const isLockedOut = true; // boolean
```

Strings are text. Numbers are numeric values. Booleans are `true` or `false`.

## Objects

Objects keep related values together.

```ts
const validUser = {
  username: "standard_user",
  password: "secret_sauce",
};
```

Instead of writing separate variables:

```ts
const username = "standard_user";
const password = "secret_sauce";
```

Use an object when the values belong to the same thing:

```ts
await page.getByPlaceholder("Username").fill(validUser.username);
await page.getByPlaceholder("Password").fill(validUser.password);
```

The dot syntax, such as `validUser.username`, reads a property from the object.

## Arrays

Arrays store lists of values.

```ts
const users = ["standard_user", "locked_out_user", "problem_user"];
```

You can access values by index:

```ts
const firstUser = users[0];
```

Indexes start at `0`, not `1`.

## Functions

Functions group reusable actions.

```ts
function buildLoginMessage(username: string) {
  return `Logging in as ${username}`;
}
```

The `username: string` part means the function expects a string.

In Playwright, helper functions are useful when multiple tests repeat the same steps:

```ts
async function login(page, username: string, password: string) {
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}
```

For larger repos, the `page` parameter should be typed:

```ts
import type { Page } from "@playwright/test";

async function login(page: Page, username: string, password: string) {
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}
```

`import type` imports only a TypeScript type. It does not add runtime code.

## Async And Await

Browser actions are not instant. Playwright returns promises for actions such as clicking, filling, and navigating.

```ts
await page.goto("https://saucedemo.com");
await page.getByRole("button", { name: "Login" }).click();
```

Use `await` before Playwright actions so the test waits for the action to finish.

This is wrong:

```ts
page.goto("https://saucedemo.com");
page.getByRole("button", { name: "Login" }).click();
```

The browser may still be loading when the next line runs.

## Template Strings

Template strings use backticks and allow values inside `${}`.

```ts
const username = "standard_user";
const message = `Logging in as ${username}`;
```

They are useful for readable error messages or dynamic URLs.

## Type Inference

TypeScript can often understand the type without you writing it.

```ts
const password = "secret_sauce";
```

TypeScript understands that `password` is a string.

You can also write the type manually:

```ts
const password: string = "secret_sauce";
```

For simple values, inference is usually enough.

## Test Data Pattern

This repo uses objects for users:

```ts
const lockedOutUser = {
  username: "locked_out_user",
  password: "secret_sauce",
};
```

This makes tests clear:

```ts
await page.getByPlaceholder("Username").fill(lockedOutUser.username);
await page.getByPlaceholder("Password").fill(lockedOutUser.password);
```

When a repo grows, move repeated test data into a separate file such as `tests/data/users.ts`.

## Common TypeScript Mistakes

| Mistake | Why it is a problem | Fix |
| --- | --- | --- |
| Forgetting quotes around text | TypeScript thinks it is a variable | Use `"standard_user"` |
| Using `=` in an assertion idea | `=` assigns a value | Use Playwright `expect` assertions |
| Forgetting `await` | The test may continue too early | Add `await` before Playwright actions |
| Misspelling object properties | The value becomes wrong or undefined | Use autocomplete and clear object names |
| Putting all data in one long line | Hard to read and review | Format objects across multiple lines |

## Student Exercise

Create a new user object:

```ts
const problemUser = {
  username: "problem_user",
  password: "secret_sauce",
};
```

Then write a test that logs in with that user and checks that the inventory page opens.
