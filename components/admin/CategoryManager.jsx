"use client";

import { useState, useEffect, useCallback } from "react";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/shop/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const startEdit = (cat) => {
    setEditing(cat.id);
    setForm({ name: cat.name, slug: cat.slug, sortOrder: cat.sortOrder || 0 });
    setError("");
  };

  const startNew = () => {
    setEditing("new");
    setForm({ name: "", slug: "", sortOrder: 0 });
    setError("");
  };

  const handleSave = async () => {
    if (!form.name) {
      setError("Name is required");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug || slugify(form.name),
      sortOrder: parseInt(form.sortOrder, 10) || 0,
    };

    const url = editing === "new" ? "/api/shop/categories" : `/api/shop/categories/${editing}`;
    const method = editing === "new" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      fetchCategories();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category? Products in this category must be moved first.")) return;
    const res = await fetch(`/api/shop/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchCategories();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete");
    }
  };

  if (loading) return <p className="text-sm text-sand-500">Loading categories...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Categories</h1>
          <p className="text-sm text-sand-500">Manage product categories for the shop.</p>
        </div>
        <button onClick={startNew} className="btn-primary text-sm px-4 py-2">
          + Add category
        </button>
      </div>

      {/* Edit/New form */}
      {editing && (
        <div className="card p-6 mb-8">
          <h3 className="font-sans text-lg font-semibold mb-4">
            {editing === "new" ? "New Category" : "Edit Category"}
          </h3>
          {error && <p className="text-sm text-rose-600 mb-4">{error}</p>}

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder={slugify(form.name || "auto-generated")}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => setEditing(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-6 py-2 disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Category list */}
      <div className="space-y-0">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-900 dark:text-sand-100">{cat.name}</span>
              <span className="text-xs text-sand-500 font-mono">/{cat.slug}</span>
              <span className="text-xs text-sand-500 tabular-nums">{cat._count?.products || 0} products</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-sand-500 tabular-nums">order: {cat.sortOrder}</span>
              <button onClick={() => startEdit(cat)} className="text-xs text-rugged-500 hover:text-rugged-600">Edit</button>
              <button onClick={() => handleDelete(cat.id)} className="text-xs text-sand-500 hover:text-rose-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
