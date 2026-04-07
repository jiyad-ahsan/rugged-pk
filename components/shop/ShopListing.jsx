"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

function StatusBadge({ status }) {
  if (status === "available") return null;
  const label = status === "coming_soon" ? "Coming soon" : "Sold out";
  const color = status === "coming_soon"
    ? "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
    : "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20";
  return (
    <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm ${color}`}>
      {label}
    </span>
  );
}

const badgeStyles = {
  branded: { text: "text-rugged-500 dark:text-rugged-400", bg: "rgba(201, 75, 48, 0.08)" },
  local: { text: "text-emerald-700 dark:text-emerald-400", bg: "rgba(4, 120, 87, 0.08)" },
  new: { text: "text-sky-700 dark:text-sky-400", bg: "rgba(3, 105, 161, 0.08)" },
};

export default function ShopListing({ products = [], categories = [] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all"); // "all" | "kits" | "gear"
  const [sortBy, setSortBy] = useState("default"); // "default" | "price-low" | "price-high" | "name"

  const hasKits = products.some((p) => p.isKit);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      // Type filter
      if (typeFilter === "kits" && !p.isKit) return false;
      if (typeFilter === "gear" && p.isKit) return false;

      // Category filter
      if (activeCategory !== "all" && p.category?.slug !== activeCategory) return false;

      // Search
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name?.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
        );
      }

      return true;
    });

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, search, activeCategory, typeFilter, sortBy]);

  // Only show categories that have products
  const activeCategories = useMemo(() => {
    const slugsInUse = new Set(products.map((p) => p.category?.slug).filter(Boolean));
    return categories.filter((c) => slugsInUse.has(c.slug));
  }, [products, categories]);

  return (
    <div className="section-container py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
          Shop
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Kits or piece by piece.
          <br />
          <span className="text-sand-600 dark:text-sand-500">Your call.</span>
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-lg">
          Start with a curated kit or build your own setup one item at a time. Everything
          is sourced locally where possible, tested in our conditions, and ships with a
          printed checklist.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-500 dark:text-sand-600 text-sm pointer-events-none">
            &#8981;
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products — try 'water', 'radio', 'first aid'..."
            className="
              w-full font-mono text-sm
              bg-sand-100 dark:bg-sand-800
              text-neutral-900 dark:text-sand-100
              placeholder-sand-500 dark:placeholder-sand-600
              pl-10 pr-4 py-3 rounded-sm
              outline-none
              transition-colors duration-200
            "
            style={{ border: "1px solid rgba(128,128,128,0.2)" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-500 hover:text-neutral-900
                         dark:hover:text-sand-100 text-sm cursor-pointer bg-transparent border-none"
            >
              &#10005;
            </button>
          )}
        </div>
      </div>

      {/* Type toggle */}
      {hasKits && (
        <div className="flex gap-2 mb-4">
          {["all", "kits", "gear"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`
                font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
                ${typeFilter === t
                  ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900"
                  : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                }
              `}
              style={typeFilter !== t ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
            >
              {t === "all" ? "All" : t === "kits" ? "Kits" : "Individual Gear"}
            </button>
          ))}
        </div>
      )}

      {/* Category filters */}
      <div className="flex gap-2.5 mb-6 flex-wrap">
        <button
          onClick={() => setActiveCategory("all")}
          className={`
            font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
            ${activeCategory === "all"
              ? "bg-rugged-500 dark:bg-rugged-400 text-white border border-rugged-500 dark:border-rugged-400"
              : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
            }
          `}
          style={activeCategory !== "all" ? { border: "1px solid rgba(128,128,128,0.2)" } : {}}
        >
          All
        </button>
        {activeCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`
              font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
              ${activeCategory === cat.slug
                ? "bg-rugged-500 dark:bg-rugged-400 text-white border border-rugged-500 dark:border-rugged-400"
                : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
              }
            `}
            style={activeCategory !== cat.slug ? { border: "1px solid rgba(128,128,128,0.2)" } : {}}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort + results count row */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-sand-500 dark:text-sand-600">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {search && <span> for &ldquo;{search}&rdquo;</span>}
          {activeCategory !== "all" && (
            <span> in {activeCategories.find((c) => c.slug === activeCategory)?.name}</span>
          )}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="font-mono text-xs bg-transparent text-sand-600 dark:text-sand-500
                     border-none outline-none cursor-pointer"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="card p-0 no-underline group overflow-hidden flex flex-col"
            >
              {/* Image / placeholder */}
              <div className="aspect-square bg-sand-50 dark:bg-sand-900 flex items-center justify-center relative overflow-hidden"
                style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}
              >
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center px-4">
                    <span className="text-3xl mb-2 block opacity-40">📦</span>
                    <span className="text-[0.6rem] text-sand-500 dark:text-sand-600 uppercase tracking-wider">
                      Photo coming soon
                    </span>
                  </div>
                )}

                {/* Badges overlay */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isKit && (
                    <span className="text-[0.55rem] uppercase tracking-widest font-semibold text-white bg-rugged-500 dark:bg-rugged-400 px-2 py-0.5 rounded-sm">
                      Kit
                    </span>
                  )}
                  {product.badge && badgeStyles[product.badge] && (
                    <span
                      className={`text-[0.55rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm ${badgeStyles[product.badge].text}`}
                      style={{ background: badgeStyles[product.badge].bg, backdropFilter: "blur(8px)" }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Status badge */}
                {product.status !== "available" && (
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={product.status} />
                  </div>
                )}

                {/* Compare price / discount */}
                {product.comparePrice && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[0.6rem] font-mono font-semibold text-white bg-emerald-600 dark:bg-emerald-500 px-2 py-0.5 rounded-sm">
                      Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Category */}
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-sand-500 dark:text-sand-600 mb-1">
                  {product.category?.name}
                </span>

                {/* Name */}
                <h3 className="font-sans text-sm font-semibold text-neutral-900 dark:text-sand-100
                               group-hover:text-rugged-500 dark:group-hover:text-rugged-400
                               transition-colors leading-snug mb-1">
                  {product.name}
                </h3>

                {/* Subtitle */}
                {product.subtitle && (
                  <p className="text-xs text-sand-500 dark:text-sand-600 leading-relaxed mb-3 line-clamp-2">
                    {product.subtitle}
                  </p>
                )}

                {/* Kit items preview */}
                {product.isKit && product.items?.length > 0 && (
                  <div className="mb-3 flex-1">
                    <ul className="space-y-1">
                      {product.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-[0.65rem] text-sand-600 dark:text-sand-500 flex items-start gap-1.5">
                          <span className="text-rugged-500 dark:text-rugged-400 font-bold leading-none mt-0.5">·</span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {product.items.length > 3 && (
                        <li className="text-[0.6rem] text-sand-500 dark:text-sand-600">
                          +{product.items.length - 3} more items
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Price — pushed to bottom */}
                <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(128,128,128,0.08)" }}>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[0.65rem] text-sand-500">Rs.</span>
                    <span className="font-sans text-lg font-bold tracking-tight text-neutral-900 dark:text-sand-100">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xs text-sand-500 line-through ml-1">
                        Rs. {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-2">
            No products found{search ? ` for "${search}"` : ""}.
          </p>
          <p className="text-xs text-sand-500 dark:text-sand-600">
            Try a different search term or{" "}
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setTypeFilter("all");
              }}
              className="text-rugged-500 dark:text-rugged-400 bg-transparent border-none
                         cursor-pointer font-mono underline"
            >
              clear all filters
            </button>
          </p>
        </div>
      )}

      {/* Trust strip */}
      <div className="mt-20 pt-8" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Locally sourced
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              Pakistani foods, local market components, nothing your family hasn't seen before
            </span>
          </div>
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Tested, not theoretical
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              Every item tested in Karachi conditions — heat, humidity, power outages
            </span>
          </div>
          <div>
            <span className="text-sm font-sans font-semibold text-neutral-900 dark:text-sand-100 block mb-1">
              Rotation reminders
            </span>
            <span className="text-xs text-sand-600 dark:text-sand-500">
              We'll remind you when food or medical supplies need replacing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
