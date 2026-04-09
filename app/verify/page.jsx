"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const { update } = useSession();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid code");
    } else {
      setSuccess(true);
      // Refresh the session so emailVerified propagates to the JWT
      await update();
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    }
  }

  async function handleResend() {
    setResending(true);
    setResendMsg("");
    setError("");

    const res = await fetch("/api/verify/resend", { method: "POST" });
    const data = await res.json();
    setResending(false);

    if (!res.ok) {
      setError(data.error || "Failed to resend code");
    } else {
      setResendMsg("New code sent — check your email");
      setCode("");
    }
  }

  return (
    <div className="section-container py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-2">
          Verify your email
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 mb-8">
          We sent a 6-digit code to your email. Enter it below.
        </p>

        {success ? (
          <div className="text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-sm"
               style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
            Email verified. Redirecting...
          </div>
        ) : (
          <>
            {error && (
              <div className="text-rose-600 dark:text-rose-400 text-xs mb-4 p-3 rounded-sm"
                   style={{ border: "1px solid rgba(225,29,72,0.3)", background: "rgba(225,29,72,0.05)" }}>
                {error}
              </div>
            )}

            {resendMsg && (
              <div className="text-emerald-600 dark:text-emerald-400 text-xs mb-4 p-3 rounded-sm"
                   style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)" }}>
                {resendMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-sand-600 dark:text-sand-500 mb-1.5">
                  Verification code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  maxLength={6}
                  autoFocus
                  className="w-full font-mono text-lg tracking-[0.5em] text-center bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 px-4 py-3 rounded-sm outline-none transition-colors duration-200"
                  style={{ border: "1px solid rgba(128,128,128,0.2)" }}
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="btn-primary w-full text-sm disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={handleResend}
                disabled={resending}
                className="font-mono text-xs text-rugged-500 dark:text-rugged-400 hover:underline disabled:opacity-50 disabled:no-underline"
              >
                {resending ? "Sending..." : "Didn't get the code? Resend"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
