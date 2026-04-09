// ============================================================
// EPISODE 1 — First Steps in TypeScript
// TypeScript for Automation QA | @ArchQA
// ============================================================

// ------------------------------------------------------------
// 1. THE PROBLEM — Why TypeScript Matters for QA
// ------------------------------------------------------------

const jsResponse = { body: { id: 1, username: "qa_engineer" } };

// In JavaScript, this runs without any warning:
// const userId = jsResponse.body.id;
// const userPassword = jsResponse.body.password; // This field doesn't exist.

// With TypeScript, we define the shape of our data FIRST:
interface UserResponse {
  id: number;
  username: string;
}

// Now if we try to access .password — TypeScript catches it IMMEDIATELY:
const mockResponse: UserResponse = { id: 1, username: "qa_engineer" };
console.log(mockResponse.id); // ✅ Works
console.log(mockResponse.username); // ✅ Works
console.log(mockResponse.password); // ❌ TypeScript Error: Property 'password' does not exist

// ------------------------------------------------------------
// 2. THE BUILDING BLOCKS — Core Types
// ------------------------------------------------------------

// === string — Text data: URLs, locators, messages ===
const baseURL: string = "https://idavidov.eu/";
const loginPagePath: string = "/login";
const expectedTitle: string = "Intelligent Quality";
const expectedMessage: string = "Subscribe to my YouTube channel";

// === number — Integers and decimals ===
const expectedItemCount: number = 13;
const expectedStatusCode: number = 200;
const price: number = 99;

// === boolean — The ultimate yes or no ===
const isButtonEnabled: boolean = true;
const isCheckboxChecked: boolean = false;
const isToggleOn: boolean = true;

// === Type Inference — TypeScript is smart ===
// TypeScript can infer the type from the assigned value:
const inferredString = "https://api.example.com"; // TypeScript knows this is a string
const inferredNumber = 42; // TypeScript knows this is a number
const inferredBoolean = true; // TypeScript knows this is a boolean

// Explicit is better than implicit for complex scenarios,
// but for simple assignments, inference keeps your code clean.

// ------------------------------------------------------------
// 3. TEMPLATE LITERALS — Building Dynamic Strings
// ------------------------------------------------------------

// Hardcoding is rarely practical. Build strings dynamically:
const blogURL: string = "https://idavidov.eu/";
const newsletterURL: string = `${blogURL}newsletter`;
console.log(newsletterURL); // Output: 'https://idavidov.eu/newsletter'

// Practical QA use case 1: Dynamic API endpoints
const userId: number = 42;
const apiBase: string = "https://api.example.com";
const userEndpoint: string = `${apiBase}/users/${userId}`;
console.log(userEndpoint); // Output: 'https://api.example.com/users/42'

// Practical QA use case 2: Custom assertion messages
const expectedCount: number = 5;
const actualCount: number = 3;
const assertionMessage: string = `Expected ${expectedCount} items but found ${actualCount}`;
console.log(assertionMessage); // Output: 'Expected 5 items but found 3'

// ------------------------------------------------------------
// 4. THE SPECIAL TRIO — void, any, unknown
// ------------------------------------------------------------

// === void — For actions, not data ===
// Functions that DO something but don't RETURN anything.
function logTestStep(step: string): void {
  console.log(`[TEST STEP] ${step}`);
}

function clickElement(selector: string): void {
  // In Playwright: await page.click(selector);
  console.log(`Clicked on: ${selector}`);
}

logTestStep("Navigate to login page");
clickElement("#login-button");

// === any — The escape hatch (USE WITH EXTREME CAUTION) ===
// Tells TypeScript: "Don't type-check this variable"
let legacyData: any = { "user-id": 123, details: "some-info" };

// TypeScript won't complain — even if this is WRONG:
console.log(legacyData.nonExistentProperty); // Returns 'undefined' at runtime — BUG HIDDEN!
legacyData = 42; // Reassigned to a number — no warning!
legacyData = "now a string"; // Reassigned again — still no warning!

// ⚠️ `any` completely defeats the purpose of TypeScript.
// It hides potential bugs. Use it as an ABSOLUTE LAST RESORT.

// === unknown — The safe alternative ===
// Forces you to CHECK the type before using the data.
async function fetchUserData(apiUrl: string): Promise<void> {
  // Imagine this comes from an external API
  const data: unknown = await fetch(apiUrl).then((res) => res.json());

  // We MUST narrow the type before using it:
  if (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    typeof (data as Record<string, unknown>).name === "string"
  ) {
    // Only inside this block does TypeScript know data has a 'name' property
    console.log(
      `User's name is ${(data as Record<string, string>).name.toUpperCase()}`,
    );
  } else {
    console.error("API response is not in the expected format.");
  }
}

// unknown = "I don't trust this data, so I'll verify before using it"
// This is EXACTLY the mindset of a QA engineer.

// === Quick Comparison ===
// any:     "Trust everything"    → Bugs hide until runtime
// unknown: "Trust nothing"       → Bugs caught at compile time
// void:    "Nothing to return"   → Intent is clear

// ------------------------------------------------------------
// 5. PUTTING IT ALL TOGETHER — A Practical QA Example
// ------------------------------------------------------------

// Test configuration — all typed
const config = {
  baseUrl: "https://api.example.com" as const,
  defaultTimeout: 30_000,
  retryCount: 3,
  isCI: process.env.CI === "true",
};

// Dynamic endpoint construction
const testUserId: number = 101;
const endpoint: string = `${config.baseUrl}/users/${testUserId}/profile`;

// Action logging with void
function logAction(action: string, target: string): void {
  const timestamp: string = new Date().toISOString();
  console.log(`[${timestamp}] ${action}: ${target}`);
}

// Safe response handling with unknown
async function validateUserProfile(url: string): Promise<void> {
  logAction("GET", url);

  const response: unknown = await fetch(url).then((r) => r.json());

  // Type narrowing — verify before trusting
  if (
    typeof response === "object" &&
    response !== null &&
    "id" in response &&
    "username" in response
  ) {
    const user = response as UserResponse;
    logAction("ASSERT", `User ID is ${user.id}`);
    logAction("ASSERT", `Username is ${user.username}`);
  } else {
    throw new Error("Response does not match expected UserResponse shape");
  }
}
l;
("");
