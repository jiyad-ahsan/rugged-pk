"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function SkeletonCard() {
  return <div className="card p-5 text-center animate-pulse"><div className="h-8 w-12 bg-sand-300 dark:bg-sand-700 rounded-sm mx-auto mb-2" /><div className="h-3 w-16 bg-sand-300 dark:bg-sand-700 rounded-sm mx-auto" /></div>;
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-sm text-sand-500">Loading...</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[1,2].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const { userCount, productCount, recentUsers, statusCounts } = data;

  const stats = [
    { label: "Users", value: userCount, href: "/admin/users", color: "text-sky-600 dark:text-sky-400" },
    { label: "Products", value: productCount, href: "/admin/products", color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-sm text-sand-500">Overview of your site activity.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat) => {
          const inner = (
            <div className="card p-5 text-center">
              <span className={`font-sans text-3xl font-bold tracking-tight block mb-1 ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-sand-500">
                {stat.label}
              </span>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="no-underline hover:scale-[1.02] transition-transform">
              {inner}
            </Link>
          ) : (
            <div key={stat.label}>{inner}</div>
          );
        })}
      </div>

      {/* Product status breakdown */}
      <div className="card p-6 mb-8">
        <h2 className="font-sans text-sm font-semibold mb-4">Product Status</h2>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Available: {statusCounts.available || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Coming Soon: {statusCounts.coming_soon || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Sold Out: {statusCounts.sold_out || 0}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-sans text-sm font-semibold">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-rugged-500 hover:text-rugged-600 no-underline">
              View all →
            </Link>
          </div>
          <div className="space-y-0">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-sand-200 dark:bg-sand-700 flex items-center justify-center text-xs font-semibold text-sand-600 dark:text-sand-400 shrink-0">
                    {(user.name || user.email)?.[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-neutral-900 dark:text-sand-100 block truncate">
                      {user.name || "—"}
                    </span>
                    <span className="text-xs text-sand-500 truncate block">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-1.5 py-0.5 rounded-sm ${
                    user.role === "ADMIN" ? "text-rugged-500 bg-rugged-500/10" :
                    user.role === "MODERATOR" ? "text-violet-600 bg-violet-500/10" :
                    "text-sand-500 bg-sand-200 dark:bg-sand-700"
                  }`}>
                    {user.role}
                  </span>
                  <span className="text-[0.6rem] text-sand-500 tabular-nums">{timeAgo(user.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
