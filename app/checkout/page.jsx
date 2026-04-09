"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import Image from "next/image";

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

const cities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot",
  "Gujranwala", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad",
  "Mardan", "Mingora", "Sahiwal", "Larkana", "Sheikhupura",
  "Other",
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.phone.trim() || !form.city || !form.address.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          city: form.city,
          address: form.address,
          notes: form.notes,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        router.push(`/checkout/confirmation?order=${data.orderNumber}`);
      } else {
        setError(data.error || "Failed to place order");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="section-container py-16 max-w-2xl mx-auto text-center">
        <span className="text-5xl block mb-4 opacity-40">🛒</span>
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-3">Your cart is empty</h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 mb-6">
          Add some products before checking out.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container py-16 max-w-4xl mx-auto">
      <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
        Checkout
      </p>
      <h1 className="font-sans text-3xl font-bold tracking-tight mb-10">
        Complete your order
      </h1>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Form — 3 cols */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          {error && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-sm px-4 py-3">
              <p className="text-sm text-rose-700 dark:text-rose-400">{error}</p>
            </div>
          )}

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1.5 block">
              Full Name *
            </label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1.5 block">
              Phone Number *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="03XX XXXXXXX"
              className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 transition-colors"
              required
            />
            <p className="text-xs text-sand-500 mt-1">For delivery coordination only</p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1.5 block">
              City *
            </label>
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 transition-colors"
              required
            >
              <option value="">Select your city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1.5 block">
              Delivery Address *
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="House/flat number, street, area, landmark"
              rows={3}
              className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 transition-colors resize-y"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1.5 block">
              Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any special instructions for delivery"
              rows={2}
              className="w-full px-4 py-3 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none focus:border-rugged-500 transition-colors resize-y"
            />
          </div>

          <div className="pt-4" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
            <p className="text-xs text-sand-500 mb-4">
              Payment method: <span className="font-semibold text-neutral-900 dark:text-sand-100">Cash on Delivery</span>
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-center py-4 disabled:opacity-50"
            >
              {submitting ? "Placing order..." : `Place Order — Rs. ${formatPrice(cartTotal)}`}
            </button>
          </div>
        </form>

        {/* Order summary — 2 cols */}
        <div className="md:col-span-2">
          <div className="card p-6 sticky top-24">
            <h3 className="font-sans text-sm font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="w-12 h-12 bg-sand-100 dark:bg-sand-800 rounded-sm border border-black/10 dark:border-white/8 shrink-0 relative overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm opacity-40">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-900 dark:text-sand-100 leading-snug truncate">{item.name}</p>
                    <p className="text-xs text-sand-500">
                      {item.quantity} x Rs. {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 dark:text-sand-100 tabular-nums shrink-0">
                    Rs. {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
              <span className="text-sm text-sand-600 dark:text-sand-500">Total</span>
              <span className="font-sans text-xl font-bold tracking-tight">
                Rs. {formatPrice(cartTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
