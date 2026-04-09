"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md z-[70]
          bg-sand-200 dark:bg-sand-900
          border-l border-black/10 dark:border-white/8
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/8">
          <h2 className="font-sans text-lg font-bold tracking-tight">
            Cart
            {cartCount > 0 && (
              <span className="text-sm font-normal text-sand-500 ml-2">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            )}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100 bg-transparent border-none cursor-pointer text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-4 opacity-40">🛒</span>
              <p className="text-sm text-sand-600 dark:text-sand-500 mb-2">
                Your cart is empty
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="text-sm text-rugged-500 dark:text-rugged-400 bg-transparent border-none cursor-pointer font-mono"
              >
                Continue shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-sand-100 dark:bg-sand-800 rounded-sm border border-black/10 dark:border-white/8 shrink-0 relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-lg opacity-40">📦</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-sand-100 leading-snug mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-sand-600 dark:text-sand-500">
                      Rs. {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-black/15 dark:border-white/10 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-xs bg-transparent border-none cursor-pointer text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 text-xs font-mono text-neutral-900 dark:text-sand-100 tabular-nums min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-xs bg-transparent border-none cursor-pointer text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-xs text-sand-500 hover:text-rose-500 bg-transparent border-none cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="text-sm font-semibold text-neutral-900 dark:text-sand-100 tabular-nums shrink-0">
                    Rs. {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/10 dark:border-white/8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-sand-600 dark:text-sand-500">Subtotal</span>
              <span className="font-sans text-xl font-bold tracking-tight">
                Rs. {formatPrice(cartTotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-primary w-full text-center block no-underline"
            >
              Checkout — Cash on Delivery →
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-sm text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100 bg-transparent border-none cursor-pointer font-mono mt-3 py-2 transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
