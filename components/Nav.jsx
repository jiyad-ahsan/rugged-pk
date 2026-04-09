"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeProvider";
import { useCart } from "./CartProvider";

const links = [
  { href: "/guides", label: "guides" },
  { href: "/forum", label: "forum" },
  { href: "/shop", label: "shop" },
];

export default function Nav() {
  const pathname = usePathname();
  const { dark, toggle } = useTheme();
  const { data: session } = useSession();
  const { cartCount, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 inset-x-0 z-50
        bg-sand-200 dark:bg-sand-900 
        border-b border-black/10 dark:border-white/8
        transition-all duration-300
        ${scrolled ? "py-3 shadow-sm" : "py-5"}
      `}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-bold text-base tracking-widest no-underline 
                     text-neutral-900 dark:text-sand-100
                     flex items-center gap-2"
        >
          <svg
            width="22" height="18" viewBox="0 0 22 18"
            fill="currentColor"
            className="text-rugged-500 dark:text-rugged-400 shrink-0"
            aria-hidden="true"
          >
            <path d="M8 1L0 17h16L8 1z" opacity="0.5" />
            <path d="M15 5L8.5 17H21.5L15 5z" />
          </svg>
          RUGGED
        </Link>

        {/* Right side: links + theme toggle */}
        <div className="flex items-center gap-8">
          <div className="flex gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    font-mono text-sm no-underline relative pb-1
                    transition-colors duration-200
                    ${active
                      ? "text-neutral-900 dark:text-sand-100"
                      : "text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                    }
                  `}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-rugged-500 dark:bg-rugged-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="
              bg-black/5 dark:bg-white/8
              border border-black/10 dark:border-white/10
              rounded-full px-3 py-1.5
              font-mono text-sm text-sand-600 dark:text-sand-500
              cursor-pointer transition-all duration-300
              hover:border-black/20 dark:hover:border-white/20
            "
            aria-label="Toggle dark mode"
          >
            {dark ? "☀" : "☾"}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="
              relative bg-black/5 dark:bg-white/8
              border border-black/10 dark:border-white/10
              rounded-full px-3 py-1.5
              font-mono text-sm text-sand-600 dark:text-sand-500
              cursor-pointer transition-all duration-300
              hover:border-black/20 dark:hover:border-white/20
            "
            aria-label="Open cart"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 1L2 4v9a1 1 0 001 1h10a1 1 0 001-1V4L12 1H4z" />
              <path d="M2 4h12" />
              <path d="M6 7a2 2 0 004 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rugged-500 text-white text-[0.55rem] font-mono font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {session?.user ? (
            <div className="flex items-center gap-4">
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="font-mono text-xs no-underline px-2.5 py-1 rounded-sm
                             bg-rugged-500/10 text-rugged-500 dark:text-rugged-400
                             hover:bg-rugged-500/20 transition-colors duration-200"
                >
                  admin
                </Link>
              )}
              <Link
                href="/account"
                className="font-mono text-sm no-underline text-sand-600 dark:text-sand-500
                           hover:text-neutral-900 dark:hover:text-sand-100 transition-colors duration-200"
              >
                {session.user.name?.split(" ")[0] || "account"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="font-mono text-sm text-rugged-500 dark:text-rugged-400
                           hover:text-rugged-600 dark:hover:text-rugged-300
                           bg-transparent border-none cursor-pointer transition-colors duration-200"
              >
                logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="font-mono text-sm no-underline text-sand-600 dark:text-sand-500
                         hover:text-neutral-900 dark:hover:text-sand-100 transition-colors duration-200"
            >
              login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
