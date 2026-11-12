/**
 * Feature switches.
 *
 * The site currently runs with NO database. Everything that needs Postgres
 * (Prisma) or Auth.js sits behind one of these switches. Flipping a switch
 * to `true` brings the existing code back; it then needs DATABASE_URL /
 * DIRECT_URL (and AUTH_SECRET for accounts) set in the environment.
 *
 * SHOP_ENABLED      cart, checkout, orders, product detail pages and the
 *                   database-driven /shop listing. When false, /shop shows
 *                   the kits from content/kits.js as "coming soon".
 * ACCOUNTS_ENABLED  login, signup, account, email verification, password
 *                   reset, the Auth.js API and the admin area (admin needs
 *                   a logged-in ADMIN user, so it lives under accounts).
 *
 * Note: checkout works for guests, so the shop can reopen on its own, but
 * managing products and orders in /admin also needs ACCOUNTS_ENABLED.
 */
export const SHOP_ENABLED = false;
export const ACCOUNTS_ENABLED = false;

// Path prefixes owned by each feature (pages and API routes).
const SHOP_PATHS = ["/checkout", "/api/orders", "/api/shop"];
const ACCOUNT_PATHS = [
  "/login",
  "/signup",
  "/account",
  "/verify",
  "/forgot-password",
  "/reset-password",
  "/admin",
  "/api/auth",
  "/api/account",
  "/api/signup",
  "/api/verify",
  "/api/forgot-password",
  "/api/reset-password",
  "/api/admin",
];

function matches(pathname, prefixes) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/** True when the path belongs to a feature that is switched off. */
export function isDisabledPath(pathname) {
  if (!SHOP_ENABLED && matches(pathname, SHOP_PATHS)) return true;
  if (!ACCOUNTS_ENABLED && matches(pathname, ACCOUNT_PATHS)) return true;
  return false;
}
