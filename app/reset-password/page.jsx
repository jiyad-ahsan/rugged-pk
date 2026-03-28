"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess(true);
    }
  }

  if (!token) {
    return (
      <div className="section-container py-16 flex justify-center">
        <div className="w-full max-w-md text-center">
          <p className="text-sm text-sand-600 dark:text-sand-500">
            Invalid or missing reset link.
          </p>
          <Link href="/forgot-password" className="text-sm text-rugged-500 dark:text-rugged-400 no-underline mt-4 inline-block">
            Request a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">
          Set new password
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 mb-8">
          Enter your new password below.
        </p>

        {success ? (
          <div>
            <div className="text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-sm mb-4"
                 style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
              Password updated successfully.
            </div>
            <Link href="/login" className="btn-primary inline-block text-sm no-underline">
              Log in
            </Link>
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
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 dark:placeholder-sand-600 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
                  style={{ border: "1px solid rgba(128,128,128,0.2)" }}
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 dark:placeholder-sand-600 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
                  style={{ border: "1px solid rgba(128,128,128,0.2)" }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
