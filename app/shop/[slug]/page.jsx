import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, subtitle: true },
  });
  if (!product) return { title: "Product — Rugged" };
  return {
    title: `${product.name} — Shop — Rugged`,
    description: product.subtitle || product.name,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { name: true, slug: true } } },
  });

  if (!product) notFound();

  // Get related products from same category
  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { sortOrder: "asc" },
    select: { name: true, slug: true, price: true, subtitle: true },
  });

  const statusLabel = product.status === "coming_soon" ? "Coming Soon" : product.status === "sold_out" ? "Sold Out" : null;
  const statusColor = product.status === "coming_soon"
    ? "text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700"
    : product.status === "sold_out"
    ? "text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-700"
    : "";

  return (
    <div className="section-container py-16 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center text-xs text-sand-500 mb-8">
        <Link href="/shop" className="hover:text-rugged-500 transition-colors">Shop</Link>
        <span>/</span>
        <span>{product.category.name}</span>
        <span>/</span>
        <span className="text-sand-600 dark:text-sand-400 truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image / placeholder */}
        <div className="bg-sand-100 dark:bg-sand-800 rounded-sm aspect-square flex items-center justify-center border border-black/10 dark:border-white/8 relative">
          {product.images?.length > 0 ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover rounded-sm" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="text-center px-8">
              <span className="text-4xl mb-3 block">📦</span>
              <span className="text-xs text-sand-500">Product image coming soon</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <span className="text-[0.6rem] uppercase tracking-widest font-medium text-emerald-700 dark:text-emerald-400 mb-2 block">
              {product.badge}
            </span>
          )}

          <h1 className="font-sans text-2xl md:text-3xl font-bold tracking-tight mb-1">
            {product.name}
          </h1>

          {product.subtitle && (
            <p className="text-sm text-sand-600 dark:text-sand-500 mb-4">{product.subtitle}</p>
          )}

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
            <span className="font-sans text-3xl font-bold tracking-tight">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-sm text-sand-500 line-through">Rs. {formatPrice(product.comparePrice)}</span>
            )}
          </div>

          {product.description && (
            <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Kit items */}
          {product.items?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 mb-3">
                What's included
              </h3>
              <ul className="space-y-2">
                {product.items.map((item, i) => (
                  <li key={i} className="text-sm text-neutral-900 dark:text-sand-100 flex items-start gap-2">
                    <span className="text-rugged-500 dark:text-rugged-400 font-bold text-base leading-none mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action */}
          {product.status === "available" ? (
            <button className="btn-primary w-full text-center mt-4">
              Add to cart →
            </button>
          ) : (
            <div className={`border rounded-sm px-4 py-3 text-center mt-4 ${statusColor}`}>
              <span className="text-sm font-medium">{statusLabel}</span>
              <p className="text-xs mt-1 opacity-70">
                {product.status === "coming_soon"
                  ? "This product is being prepared. Join the forum to be notified when it's available."
                  : "This product is currently out of stock."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="section-title mb-6">Also in {product.category.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/shop/${r.slug}`}
                className="card p-4 no-underline hover:border-rugged-500/30"
              >
                <h4 className="text-sm font-medium text-neutral-900 dark:text-sand-100 mb-1">{r.name}</h4>
                {r.subtitle && <p className="text-xs text-sand-500 mb-2">{r.subtitle}</p>}
                <span className="text-sm font-semibold">Rs. {formatPrice(r.price)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
