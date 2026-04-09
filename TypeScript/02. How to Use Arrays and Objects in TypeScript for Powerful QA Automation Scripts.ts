// ============================================================
// EPISODE 2 — Arrays and Objects
// TypeScript for Automation QA | @ArchQA
// ============================================================

// ------------------------------------------------------------
// 1. ARRAYS — Your First Collection
// ------------------------------------------------------------

// Tests rarely deal with just one of anything.
// An Array is a list of items of the GIVEN type.

// Testing a dropdown menu with a list of cryptocurrencies:
const cryptoOptions: string[] = [
  "Bitcoin",
  "Litecoin",
  "Ethereum",
  "Cardano",
  "Solana",
];

// string[] tells TypeScript: "This is a list of strings."
// Only strings can be added — no accidental numbers or booleans.

// Arrays of other types:
const statusCodes: number[] = [200, 201, 400, 404, 500];
const featureFlags: boolean[] = [true, false, true, true];
const unionArray: (string | number)[] = ["one", 2];

// ------------------------------------------------------------
// 2. TUPLES — Fixed and Focused
// ------------------------------------------------------------

// A Tuple is a fixed-length array where the type of each element is known.
// Perfect for data pairs where order matters.

// User credentials: always [username, password]
type UserCredentials = [string, string];

const adminCredentials: UserCredentials = ["adminUser", "P@ssw0rd123!"];

// This would cause an error! The structure is wrong.
const invalidCredentials: UserCredentials = ["tester", 12345];
// Error: Type 'number' is not assignable to type 'string'.

// Tuples ensure data pairs maintain their structure throughout your tests.

// ------------------------------------------------------------
// 3. ARRAY METHODS — map, forEach, filter
// ------------------------------------------------------------

// === .map() — Transforming Data ===
// Creates a NEW array by transforming every element.

// Simulated example without Playwright:
const uppercasedCryptos: string[] = cryptoOptions.map((name) =>
  name.toUpperCase(),
);
// ['BITCOIN', 'LITECOIN', 'ETHEREUM', 'CARDANO', 'SOLANA']

// Use .map() to extract specific attributes like
// href, prices, or text from element lists.

// === .forEach() — Performing Actions ===
// Executes an action for each item. Does NOT create a new array.

cryptoOptions.forEach((name) => {
  console.log(`Verifying currency: ${name}`);
});

// Use .forEach() to click buttons, fill inputs, or log data for debugging.

// === .filter() — Finding What You Need ===
// Creates a NEW array with only elements that pass a condition.

// Find all cryptocurrencies containing the letter "o":
const o_cryptos: string[] = cryptoOptions.filter((name) => name.includes("o"));
// o_cryptos is now ['Bitcoin', 'Litecoin', 'Cardano', 'Solana']

// Use .filter() for assertions: filter visible elements, find specific items.

// ------------------------------------------------------------
// 4. OBJECTS — Structuring Complex Data
// ------------------------------------------------------------

// Arrays are great for lists. Objects are for complex, structured data.
// Objects group related data under a single variable using key-value pairs.

// Define the "shape" of an object using an interface:
interface UserProfile {
  id: number;
  username: string;
  email: string;
  isProMember: boolean;
  lastLogin: Date;
}

// Create a user object that MUST conform to this shape:
const testUser: UserProfile = {
  id: 101,
  username: "qa_tester",
  email: "tester@example.com",
  isProMember: false,
  lastLogin: new Date(),
};

// TypeScript immediately flags missing or mistyped properties!
const badUser: UserProfile = { id: 1, username: "test" };
// Error: Property 'email' is missing in type...

// Pass the neatly organized object into your test functions:
async function login(user: UserProfile): Promise<void> {
  await page.getByRole("textbox", { name: "Username" }).fill(user.username);
  await page.getByRole("textbox", { name: "Email" }).fill(user.email);
  await page.getByRole("button", { name: "Login" }).click();
}

// Call the function with structured data — clean and scalable:
await login(testUser);

// ------------------------------------------------------------
// 5. interface vs type — Quick Note
// ------------------------------------------------------------

// Both can define object shapes.

// interface — best for object models (can be extended):
interface AdminProfile extends UserProfile {
  role: string;
}

// type — more versatile (unions, complex combinations):
type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

// We go deep on this in Episode 4!

// ============================================================
// KEY TAKEAWAYS
// ============================================================
// 1. Arrays (string[]) — lists of given-type items
// 2. Tuples ([string, string]) — fixed structure, fixed types
// 3. .map() transforms, .forEach() acts, .filter() selects
// 4. Objects + Interfaces — structured data with enforced shapes
// 5. Structure your test data just like the application does
//
//
// NEXT EPISODE: Functions, Loops, and Conditionals
// ============================================================
