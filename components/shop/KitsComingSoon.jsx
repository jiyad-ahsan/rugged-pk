import Link from "next/link";
import kits from "@/content/kits";

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

// Static shop page used while SHOP_ENABLED is false (lib/features.js).
// Shows the kits from content/kits.js with no cart or checkout.
export default function KitsComingSoon() {
  return (
    <div className="section-container py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
          Shop
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Kits are coming soon.
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-lg">
          We are still putting these together. Everything is sourced locally where possible,
          tested in our conditions, and ships with a printed checklist. Orders are not open yet.
        </p>
      </div>

      {/* Kits */}
      <div className="grid md:grid-cols-3 gap-5">
        {kits.map((kit) => (
          <div key={kit.slug} id={kit.slug} className="card p-6 flex flex-col scroll-mt-24">
            <div className="flex justify-between items-center mb-3 gap-3">
              {kit.highlight && (
                <span className="text-[0.6rem] uppercase tracking-widest font-medium text-rugged-500 dark:text-rugged-400">
                  {kit.highlight}
                </span>
              )}
              <span className="text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 ml-auto">
                Coming soon
              </span>
            </div>

            <h2 className="font-sans text-xl font-bold tracking-tight mb-1">{kit.name}</h2>
            <p className="text-sm text-sand-600 dark:text-sand-500 mb-3">{kit.subtitle}</p>

            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
              <span className="font-sans text-2xl font-bold tracking-tight">{formatPrice(kit.price)}</span>
            </div>

            <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5">
              {kit.description}
            </p>

            <h3 className="text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-3">
              What's included
            </h3>
            <ul className="space-y-2 mb-6 flex-1">
              {kit.items.map((item) => (
                <li key={item} className="text-sm text-neutral-900 dark:text-sand-100 flex items-start gap-2">
                  <span className="text-rugged-500 dark:text-rugged-400 font-bold text-base leading-none mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="border rounded-sm px-4 py-3 text-center text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700">
              <span className="text-sm font-medium">Coming soon</span>
              <p className="text-xs mt-1 opacity-70">Not available to order yet.</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-sand-600 dark:text-sand-500 mt-10">
        Don't want to wait?{" "}
        <Link href="/guides/go-bag-guide" className="text-rugged-500 dark:text-rugged-400">
          The go-bag guide
        </Link>{" "}
        shows you how to build your own from local markets.
      </p>
    </div>
  );
}
