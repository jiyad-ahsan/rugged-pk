"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/account")
        .then((r) => r.json())
        .then((data) => {
          setDisplayName(data.displayName || "");
          setLoading(false);
        });
    }
  }, [status, router]);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);

    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="section-container py-16 flex justify-center">
        <p className="text-sm text-sand-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="section-container py-16 max-w-lg mx-auto">
      <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">Account</h1>
      <p className="text-sm text-sand-600 dark:text-sand-500 mb-8">
        Manage your profile settings.
      </p>

      <div className="card p-6">
        <div className="mb-6">
          <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1">
            Email
          </label>
          <p className="text-sm text-neutral-900 dark:text-sand-100">{session?.user?.email}</p>
        </div>

        <div className="mb-6">
          <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1">
            Real name
          </label>
          <p className="text-sm text-neutral-900 dark:text-sand-100">{session?.user?.name || "—"}</p>
          <p className="text-xs text-sand-500 mt-1">Only visible to admins. Not shown publicly.</p>
        </div>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
              Display name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 dark:placeholder-sand-600 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
              style={{ border: "1px solid rgba(128,128,128,0.2)" }}
              placeholder="How you appear on the forum"
            />
            <p className="text-xs text-sand-500 mt-1.5">
              Letters, numbers, spaces, dots and hyphens. 2–30 characters. Leave blank to use your real name.
            </p>
          </div>

          {error && (
            <div className="text-rose-600 dark:text-rose-400 text-xs mb-4 p-3 rounded-sm"
                 style={{ border: "1px solid rgba(225,29,72,0.3)", background: "rgba(225,29,72,0.05)" }}>
              {error}
            </div>
          )}

          {saved && (
            <div className="text-emerald-600 dark:text-emerald-400 text-xs mb-4 p-3 rounded-sm"
                 style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
              Display name updated.
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-sm px-6 py-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>

      <p className="text-center mt-6">
        <Link href="/forgot-password" className="font-mono text-xs text-rugged-500 dark:text-rugged-400 no-underline hover:underline">
          Change password
        </Link>
      </p>
    </div>
  );
}
