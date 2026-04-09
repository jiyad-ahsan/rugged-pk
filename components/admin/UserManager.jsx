"use client";

import { useState } from "react";

const roleColors = {
  ADMIN: "text-rugged-500 bg-rugged-500/10",
  MODERATOR: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
  USER: "text-sand-600 dark:text-sand-400 bg-sand-200 dark:bg-sand-700",
};

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const inputClass = "w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none";

export default function UserManager({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRoleChange = async (userId, newRole) => {
    if (!confirm(`Change this user's role to ${newRole}?`)) return;
    setUpdating(userId);

    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });

    if (res.ok) {
      setUsers(users.map((u) => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update role");
    }
    setUpdating(null);
  };

  const handleToggleVerify = async (userId, isCurrentlyVerified) => {
    const action = isCurrentlyVerified ? "unverify" : "verify";
    setUpdating(userId);

    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(users.map((u) => u.id === userId ? { ...u, emailVerified: data.emailVerified } : u));
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update verification");
    }
    setUpdating(null);
  };

  const handleAddUser = async () => {
    if (!addForm.email || !addForm.password) {
      setAddError("Email and password are required");
      return;
    }
    setAdding(true);
    setAddError("");

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });

    if (res.ok) {
      const newUser = await res.json();
      setUsers([{ ...newUser, _count: { threads: 0, replies: 0 } }, ...users]);
      setShowAdd(false);
      setAddForm({ name: "", email: "", password: "", role: "USER" });
    } else {
      const data = await res.json();
      setAddError(data.error || "Failed to create user");
    }
    setAdding(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Users</h1>
          <p className="text-sm text-sand-500">{users.length} registered users.</p>
        </div>
        <button onClick={() => { setShowAdd(!showAdd); setAddError(""); }} className="btn-primary text-sm px-4 py-2">
          + Add user
        </button>
      </div>

      {/* Add user form */}
      {showAdd && (
        <div className="card p-6 mb-8">
          <h3 className="font-sans text-lg font-semibold mb-4">New User</h3>
          {addError && <p className="text-sm text-rose-600 mb-4">{addError}</p>}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Name</label>
              <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                placeholder="Optional" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Email *</label>
              <input type="email" value={addForm.email} onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                placeholder="user@example.com" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Password *</label>
              <input type="text" value={addForm.password} onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                placeholder="Min 6 characters" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Role</label>
              <select value={addForm.role} onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                className={inputClass}>
                <option value="USER">User</option>
                <option value="MODERATOR">Moderator</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-sand-500 mb-4">Admin-created users are automatically email-verified.</p>

          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowAdd(false)} className="btn-outline text-sm px-4 py-2">Cancel</button>
            <button onClick={handleAddUser} disabled={adding} className="btn-primary text-sm px-6 py-2 disabled:opacity-50">
              {adding ? "Creating..." : "Create user"}
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-500 text-sm pointer-events-none">&#8981;</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full font-mono text-sm bg-sand-100 dark:bg-sand-800 text-neutral-900 dark:text-sand-100 placeholder-sand-500 pl-10 pr-4 py-2.5 rounded-sm outline-none"
            style={{ border: "1px solid rgba(128,128,128,0.2)" }}
          />
        </div>

        <div className="flex gap-2">
          {["all", "USER", "MODERATOR", "ADMIN"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
                ${roleFilter === role
                  ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900"
                  : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                }`}
              style={roleFilter !== role ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
            >
              {role === "all" ? "All" : role}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-sand-500 mb-4">{filtered.length} {filtered.length === 1 ? "user" : "users"} shown</p>

      {/* User list */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-xs font-mono uppercase tracking-wider text-sand-500 bg-sand-50 dark:bg-sand-900"
          style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}
        >
          <span className="col-span-3">User</span>
          <span className="col-span-3">Email</span>
          <span className="col-span-1">Role</span>
          <span className="col-span-1">Threads</span>
          <span className="col-span-1">Replies</span>
          <span className="col-span-1">Verified</span>
          <span className="col-span-1">Joined</span>
          <span className="col-span-1">Actions</span>
        </div>

        {filtered.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-3.5 items-center"
            style={{ borderBottom: "1px solid rgba(128,128,128,0.06)" }}
          >
            {/* Name */}
            <div className="md:col-span-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sand-200 dark:bg-sand-700 flex items-center justify-center text-xs font-semibold text-sand-600 dark:text-sand-400 shrink-0">
                {(user.name || user.email)?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-sand-100 truncate">
                {user.name || "—"}
              </span>
            </div>

            {/* Email */}
            <span className="md:col-span-3 text-xs text-sand-500 truncate">{user.email}</span>

            {/* Role */}
            <div className="md:col-span-1">
              <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-1.5 py-0.5 rounded-sm ${roleColors[user.role]}`}>
                {user.role}
              </span>
            </div>

            {/* Threads */}
            <span className="md:col-span-1 text-xs text-sand-500 tabular-nums">
              <span className="md:hidden text-sand-400">Threads: </span>{user._count?.threads || 0}
            </span>

            {/* Replies */}
            <span className="md:col-span-1 text-xs text-sand-500 tabular-nums">
              <span className="md:hidden text-sand-400">Replies: </span>{user._count?.replies || 0}
            </span>

            {/* Verified */}
            <div className="md:col-span-1">
              <button
                onClick={() => handleToggleVerify(user.id, !!user.emailVerified)}
                disabled={updating === user.id}
                className={`text-xs px-1.5 py-0.5 rounded-sm cursor-pointer transition-all disabled:opacity-50 ${
                  user.emailVerified
                    ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    : "text-sand-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10"
                }`}
                title={user.emailVerified ? "Click to unverify" : "Click to verify"}
              >
                {user.emailVerified ? "✓ Yes" : "✗ No"}
              </button>
            </div>

            {/* Joined */}
            <span className="md:col-span-1 text-[0.65rem] text-sand-500 tabular-nums">{timeAgo(user.createdAt)}</span>

            {/* Actions */}
            <div className="md:col-span-1">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                disabled={updating === user.id}
                className="text-xs bg-transparent text-sand-600 dark:text-sand-500 border border-black/10 dark:border-white/8 rounded-sm px-1.5 py-1 cursor-pointer outline-none disabled:opacity-50"
              >
                <option value="USER">User</option>
                <option value="MODERATOR">Mod</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-sand-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
