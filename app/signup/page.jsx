"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
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

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    // Auto sign in after signup
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but login failed. Try logging in.");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="section-container py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">
          Create an account
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 mb-8">
          Join the community. Save guides offline. Build your plan.
        </p>

        {error && (
          <div className="text-rose-600 dark:text-rose-400 text-xs mb-4 p-3 rounded-sm"
               style={{ border: "1px solid rgba(225,29,72,0.3)", background: "rgba(225,29,72,0.05)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 dark:placeholder-sand-600 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
              style={{ border: "1px solid rgba(128,128,128,0.2)" }}
              placeholder="Your name"
            />
          </div>

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

          <div>
            <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
              Password
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
              Confirm password
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full" style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }} />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-sand-200 dark:bg-sand-900 px-3 font-mono text-xs text-sand-500 dark:text-sand-600">
              or
            </span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn-outline w-full text-sm"
        >
          Continue with Google
        </button>

        <p className="text-center font-mono text-xs text-sand-600 dark:text-sand-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-rugged-500 dark:text-rugged-400 no-underline hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
