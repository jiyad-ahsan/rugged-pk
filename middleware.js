import { NextResponse } from "next/server";
import { SHOP_ENABLED, ACCOUNTS_ENABLED, isDisabledPath } from "@/lib/features";

const protectedPaths = ["/admin"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Features switched off in lib/features.js
  if (isDisabledPath(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Pages return notFound() from their segment layout.
    return NextResponse.next();
  }

  // Product detail pages read from the database; send visitors to the
  // static "coming soon" shop page while the shop is closed.
  if (!SHOP_ENABLED && pathname.startsWith("/shop/")) {
    return NextResponse.redirect(new URL("/shop", req.url));
  }

  if (pathname.startsWith("/api/")) return NextResponse.next();

  const isProtected =
    ACCOUNTS_ENABLED && protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  // Check for Auth.js session token cookie
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)"],
};
