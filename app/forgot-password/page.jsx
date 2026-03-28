"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    } else {
      setSent(true);
    }
  }

  return (
    <div className="section-container py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">
          Reset your password
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 mb-8">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-sm"
               style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
            If an account exists with that email, you'll receive a reset link shortly.
          </div>
        ) : (
          <>
            {error && (
              <div className="text-rose-600 dark:text-rose-400 text-xs mb-4 p-3 rounded-sm"
                   style={{ border: "1px solid rgba(225,29,72,0.3)", background: "rgba(225,29,72,0.05)" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 dark:placeholder-sand-600 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
                  style={{ border: "1px solid rgba(128,128,128,0.2)" }}
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}

        <p className="text-center font-mono text-xs text-sand-600 dark:text-sand-500 mt-6">
          <Link href="/login" className="text-rugged-500 dark:text-rugged-400 no-underline hover:underline">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
