"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/orders", label: "Orders", icon: "☰" },
  { href: "/admin/products", label: "Products", icon: "▦" },
  { href: "/admin/categories", label: "Categories", icon: "◫" },
  { href: "/admin/users", label: "Users", icon: "◉" },
  { href: "/admin/moderation", label: "Moderation", icon: "⚑" },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-sand-100 dark:bg-sand-800 border-r border-black/10 dark:border-white/8">
        <div className="p-6 pb-4">
          <Link href="/admin" className="no-underline">
            <span className="font-sans text-sm font-bold text-neutral-900 dark:text-sand-100 tracking-tight">
              Rugged
            </span>
            <span className="text-xs font-mono text-rugged-500 dark:text-rugged-400 ml-1.5 uppercase tracking-wider">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm no-underline transition-colors
                ${isActive(item.href)
                  ? "bg-rugged-500/10 text-rugged-600 dark:text-rugged-400 font-medium"
                  : "text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100 hover:bg-black/5 dark:hover:bg-white/5"
                }
              `}
            >
              <span className="text-base leading-none w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto" style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-sand-500 hover:text-rugged-500 dark:hover:text-rugged-400 no-underline transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center gap-1 px-4 py-3 bg-sand-100 dark:bg-sand-800 border-b border-black/10 dark:border-white/8 overflow-x-auto">
        <Link href="/" className="text-xs text-sand-500 hover:text-rugged-500 no-underline mr-3 shrink-0">←</Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-xs font-mono px-3 py-1.5 rounded-sm no-underline whitespace-nowrap transition-colors
              ${isActive(item.href)
                ? "bg-rugged-500/10 text-rugged-600 dark:text-rugged-400 font-medium"
                : "text-sand-600 dark:text-sand-500"
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
