import { test, expect } from "@playwright/test";

test("How to Master Fundamental TypeScript Logic for Smarter Automation QA", async ({
  page,
  request,
}) => {
  // ============================================================
  // EPISODE 3 — Fundamental TypeScript Logic
  // TypeScript for Automation QA | @ArchQA
  // ============================================================

  // ------------------------------------------------------------
  // 1. FUNCTIONS — Your Reusable Code Blocks
  // ------------------------------------------------------------

  // A function is a reusable block of code — the heart of DRY.

  // === Named Functions ===
  async function navigateToHomePage() {
    await page.goto("https://idavidov.eu/");
    await expect(
      page.getByRole("heading", { name: "Intelligent Quality" }),
    ).toBeVisible();
  }

  // Call it anywhere:
  // await navigateToHomePage();

  // === Arrow Functions ===
  const navigateToHomePageArrow = async () => {
    await page.goto("https://idavidov.eu/");
    await expect(
      page.getByRole("heading", { name: "Intelligent Quality" }),
    ).toBeVisible();
  };

  // Same call:
  // await navigateToHomePageArrow();

  // Both styles achieve the same goal. The choice is team preference.

  // ------------------------------------------------------------
  // 2. ADVANCED FUNCTION PARAMETERS
  // ------------------------------------------------------------

  // === Object Destructuring ===
  // Pull out exactly the properties you need in the parameter list.

  interface User {
    id: number;
    username: string;
    password: string;
  }

  // The function destructures username and password directly:
  async function login({ username, password }: User) {
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
  }

  // Pass the user object directly:
  const testUser: User = {
    id: 1,
    username: "tester1",
    password: "securePassword123",
  };
  // await login(testUser);

  // === Optional and Default Parameters ===
  async function registerUser(
    email: string,
    password: string,
    subscribeToNewsletter?: boolean, // Optional parameter (may or may not be passed)
    acceptTerms: boolean = true, // Default parameter (true if not provided)
  ) {
    // ... fill email field
    // ... fill password field
    // ... check the acceptTerms box if true
    // We'll add logic for the optional param in the conditionals section!
  }

  // Flexible calls:
  // await registerUser('user@test.com', 'password');                     // uses defaults
  // await registerUser('user@test.com', 'password', true);               // subscribes
  // await registerUser('user@test.com', 'password', false, false);       // no subscribe, no terms

  // ------------------------------------------------------------
  // 3. LOOPS — Automating Repetitive Actions
  // ------------------------------------------------------------

  // === The for Loop ===
  // Great when you need an index.

  // Verify every product in a search result list is visible:
  const productLocators = await page.locator(".product-item").all();

  for (let i = 0; i < productLocators.length; i++) {
    console.log(`Checking product #${i + 1}`);
    await expect(productLocators[i]).toBeVisible();
  }

  // === The for...of Loop ===
  // More modern and readable — iterates over array values directly.

  const productLocatorsForOf = await page.locator(".product-item").all();

  for (const locator of productLocatorsForOf) {
    await expect(locator).toBeVisible();
  }

  // Use for...of whenever you work with each item in an array.

  // === The for...in Loop ===
  // Iterates over the KEYS (properties) of an object.

  const testConfig = {
    browser: "chromium",
    headless: true,
    timeout: 30000,
  };

  for (const key in testConfig) {
    console.log(
      `Config key: ${key}, Value: ${testConfig[key as keyof typeof testConfig]}`,
    );
  }

  // === The while Loop ===
  // Runs as long as a condition is true. Perfect when iteration count is unknown.

  // Wait for a "Success!" message to appear after submitting a form:
  await page.getByRole("button", { name: "Submit" }).click();

  let successMessageVisible = false;
  let attempts = 0;

  while (!successMessageVisible && attempts < 10) {
    successMessageVisible = await page.getByText("Success!").isVisible();
    attempts++;
    await page.waitForTimeout(500); // Wait half a second between checks
  }

  expect(successMessageVisible).toBe(true);

  // ------------------------------------------------------------
  // 4. CONDITIONALS — Making Your Tests "Think"
  // ------------------------------------------------------------

  // === if / else Statements ===
  // Revisiting registerUser with conditional logic:

  async function registerUserFull(
    email: string,
    subscribeToNewsletter?: boolean,
    acceptTerms: boolean = true,
  ) {
    await page.getByLabel("Email").fill(email);

    // If subscribeToNewsletter was passed as true...
    if (subscribeToNewsletter) {
      await page.getByLabel("Subscribe to newsletter").check();
    }

    if (acceptTerms) {
      await page.getByLabel("I accept the terms").check();
    }

    await page.getByRole("button", { name: "Register" }).click();
  }

  // === The Ternary Operator ===
  // A clean one-liner for simple if/else: condition ? if_true : if_false

  async function createFullURL(path: string, baseURL?: string) {
    // If baseURL exists, combine them. Otherwise, just use path.
    const fullURL = baseURL ? `${baseURL}${path}` : path;
    return fullURL;
  }

  // Returns '/api/users'
  const url1 = await createFullURL("/api/users");
  // Returns 'https://my-api.com/api/users'
  const url2 = await createFullURL("/api/users", "https://my-api.com");

  // === The switch Statement ===
  // Clean way to handle multiple distinct conditions on a single value.

  type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

  async function sendApiRequest(method: ApiMethod, url: string) {
    switch (method) {
      case "GET":
        return await request.get(url);
      case "POST":
        return await request.post(url, { data: { name: "New Item" } });
      case "PUT":
        return await request.put(url, { data: { name: "Updated Item" } });
      case "DELETE":
        return await request.delete(url);
      default:
        throw new Error(`Unsupported API method: ${method}`);
    }
  }

  // Easy to call:
  // const response = await sendApiRequest('GET', '/api/items');

  // ============================================================
  // KEY TAKEAWAYS
  // ============================================================
  // 1. Functions (named & arrow) — reusable code blocks, DRY principle
  // 2. Destructuring — clean parameter extraction from objects
  // 3. Optional (?) and default (=) parameters — flexible functions
  // 4. for / for...of / for...in / while — loop for every scenario
  // 5. if/else, ternary, switch — make your tests think
  //
  // HOMEWORK: Refactor a test with repeated actions:
  //   1. Create a reusable login function accepting a User object
  //   2. Create an array of User objects
  //   3. Use for...of to iterate and call login for each user
  //   4. Bonus: Add a conditional for admin-specific checks
  //
  // NEXT EPISODE: Custom Types — banning `any` for good
  // ============================================================
});
