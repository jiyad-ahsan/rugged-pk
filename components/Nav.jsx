"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/guides", label: "guides" },
  { href: "/forum", label: "forum" },
  { href: "/shop", label: "shop" },
];

export default function Nav() {
  const pathname = usePathname();
  const { dark, toggle } = useTheme();
  const { data: session } = useSession();
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
          <span className="text-rugged-500 dark:text-rugged-400 text-xl leading-none">
            ▮
          </span>
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

          {/* Auth */}
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="font-mono text-sm text-sand-600 dark:text-sand-500
                         hover:text-neutral-900 dark:hover:text-sand-100
                         bg-transparent border-none cursor-pointer transition-colors duration-200"
            >
              {session.user.name?.split(" ")[0] || "account"} ·{" "}
              <span className="text-rugged-500 dark:text-rugged-400">logout</span>
            </button>
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
