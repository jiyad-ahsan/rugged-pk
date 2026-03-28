"use client";

import { useState } from "react";

export default function TableOfContents({ items = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <nav className="my-8 card p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-transparent border-none cursor-pointer text-left"
      >
        <span className="font-sans text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600">
          In this guide
        </span>
        <span className="text-sand-500 dark:text-sand-600 text-xs">
          {isOpen ? "—" : "+"}
        </span>
      </button>

      {isOpen && (
        <ol className="mt-4 space-y-2 list-none m-0 p-0">
          {items.map((item) => (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className={`
                  text-sm no-underline transition-colors
                  text-sand-600 dark:text-sand-500
                  hover:text-rugged-500 dark:hover:text-rugged-400
                  ${item.level === 3 ? "pl-4 text-xs" : ""}
                `}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
