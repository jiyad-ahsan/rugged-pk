"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="section-container py-16 max-w-xl mx-auto text-center">
      <div className="card p-10">
        <span className="text-5xl block mb-6">✓</span>

        <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">
          Order placed
        </h1>

        {orderNumber && (
          <p className="font-mono text-lg text-rugged-500 dark:text-rugged-400 font-semibold mb-4">
            {orderNumber}
          </p>
        )}

        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-2">
          Your order has been received. We will contact you on the phone number
          you provided to confirm delivery details.
        </p>

        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-8">
          Payment will be collected at the time of delivery (Cash on Delivery).
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/shop" className="btn-primary">
            Continue shopping →
          </Link>
          <Link
            href="/"
            className="font-mono text-sm text-sand-600 dark:text-sand-500 self-center
                       hover:text-neutral-900 dark:hover:text-sand-100 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="section-container py-16 max-w-xl mx-auto text-center">
        <p className="text-sm text-sand-500">Loading...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
