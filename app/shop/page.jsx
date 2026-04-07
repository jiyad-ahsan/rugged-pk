import Link from "next/link";
import prisma from "@/lib/db";

const badgeStyles = {
  branded: { text: "text-rugged-500 dark:text-rugged-400", bg: "rgba(201, 75, 48, 0.08)" },
  local: { text: "text-emerald-700 dark:text-emerald-400", bg: "rgba(4, 120, 87, 0.08)" },
  new: { text: "text-sky-700 dark:text-sky-400", bg: "rgba(3, 105, 161, 0.08)" },
};

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

export const metadata = {
  title: "Shop — Rugged",
  description: "Preparedness kits and individual gear built for Pakistani families. Local foods, reliable power, real medical supplies.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let kits = [];
  let gearByCategory = [];

  try {
    const allProducts = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { category: { select: { name: true, slug: true } } },
    });

    kits = allProducts.filter((p) => p.isKit);

    // Group non-kit products by category
    const categoryMap = {};
    for (const p of allProducts.filter((p) => !p.isKit)) {
      const catName = p.category.name;
      if (!categoryMap[catName]) categoryMap[catName] = { name: catName, items: [] };
      categoryMap[catName].items.push(p);
    }
    gearByCategory = Object.values(categoryMap);
  } catch {
    // Database unavailable
  }

  const heroKit = kits.find((k) => k.kitHighlight === "Complete protection");

  return (
    <div className="section-container py-16">
      {/* ══════ HEADER ══════ */}
      <div className="mb-12">
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

      {/* ══════ KITS ══════ */}
      {kits.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-8">
            <span className="section-title">Curated Kits</span>
            <span className="section-note">save 15–20% vs buying items separately</span>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {kits.map((kit) => {
              const isHero = kit === heroKit;
              return (
                <Link
                  key={kit.id}
                  href={`/shop/${kit.slug}`}
                  className={`card p-7 relative flex flex-col no-underline group ${
                    isHero ? "border-2 !border-rugged-500 dark:!border-rugged-400" : ""
                  }`}
                  style={isHero ? { background: "rgba(201, 75, 48, 0.04)" } : {}}
                >
                  {isHero && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rugged-500 dark:bg-rugged-400 text-white text-[0.65rem] font-mono tracking-widest px-3 py-1 rounded-sm whitespace-nowrap">
                      ★ MOST COMPREHENSIVE
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-widest font-medium">
                        {kit.kitHighlight || "Kit"}
                      </span>
                      <StatusBadge status={kit.status} />
                    </div>
                    <h2 className="font-sans text-xl font-bold tracking-tight mt-1">
                      {kit.name}
                    </h2>
                    <p className="text-sm text-sand-600 dark:text-sand-500 mt-0.5">
                      {kit.subtitle}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
                    <span className="font-sans text-3xl font-bold tracking-tight">
                      {formatPrice(kit.price)}
                    </span>
                    {kit.comparePrice && (
                      <span className="text-sm text-sand-500 line-through ml-2">
                        Rs. {formatPrice(kit.comparePrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5">
                    {kit.description}
                  </p>

                  <ul className="mb-6 space-y-2.5 flex-1">
                    {kit.items.map((item, i) => (
                      <li key={i} className="text-sm text-neutral-900 dark:text-sand-100 flex items-start gap-2">
                        <span className="text-rugged-500 dark:text-rugged-400 font-bold text-base leading-none mt-0.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <span className={`${isHero ? "btn-primary" : "btn-outline"} w-full text-center block`}>
                      {kit.status === "available" ? "Add to cart →" : "View details →"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════ INDIVIDUAL GEAR ══════ */}
      {gearByCategory.length > 0 && (
        <div className="mt-20">
          <div className="flex justify-between items-baseline mb-4">
            <span className="section-title">Individual Gear</span>
            <span className="section-note">build your own setup</span>
          </div>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-xl mb-10">
            Don't need the full kit? Pick what matters most to you and start there.
            Every item here is the same quality that goes into our curated kits —
            no filler products, no corner cutting.
          </p>

          <div className="space-y-12">
            {gearByCategory.map((cat) => (
              <div key={cat.name}>
                <h3
                  className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-sand-100 mb-4 pb-2"
                  style={{ borderBottom: "1px solid rgba(128,128,128,0.15)" }}
                >
                  {cat.name}
                </h3>
                <div className="space-y-0">
                  {cat.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/shop/${item.slug}`}
                      className="flex items-center justify-between py-3 group no-underline"
                      style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-sm text-neutral-900 dark:text-sand-100 group-hover:text-rugged-500 dark:group-hover:text-rugged-400 transition-colors">
                          {item.name}
                        </span>
                        {item.subtitle && (
                          <span className="text-xs text-sand-500 hidden sm:inline">{item.subtitle}</span>
                        )}
                        {item.badge && badgeStyles[item.badge] && (
                          <span
                            className={`text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm shrink-0 ${badgeStyles[item.badge].text}`}
                            style={{ background: badgeStyles[item.badge].bg }}
                          >
                            {item.badge}
                          </span>
                        )}
                        <StatusBadge status={item.status} />
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm text-sand-600 dark:text-sand-500 tabular-nums">
                          Rs. {formatPrice(item.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════ MERCH — COMING SOON ══════ */}
      <div className="mt-20">
        <div className="flex justify-between items-baseline mb-4">
          <span className="section-title">Merch</span>
          <span className="section-note">coming soon</span>
        </div>
        <div className="card p-8 text-center max-w-lg mx-auto">
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-2">
            Hoodies, masks, caps. Wear the signal.
          </p>
          <p className="text-xs text-sand-600 dark:text-sand-500 opacity-70">
            Merch drops when the community is ready. Join the forum to be first to know.
          </p>
        </div>
      </div>

      {/* ══════ TRUST STRIP ══════ */}
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
