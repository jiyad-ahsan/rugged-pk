"use client";

import { useState, useEffect, useCallback } from "react";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const inputClass = "w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none";

function CategorySection({ title, description, apiBase, categories, onRefresh, countLabel, hasDescription }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startEdit = (cat) => {
    setEditing(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      sortOrder: cat.sortOrder || 0,
      ...(hasDescription ? { description: cat.description || "" } : {}),
    });
    setError("");
  };

  const startNew = () => {
    setEditing("new");
    setForm({
      name: "",
      slug: "",
      sortOrder: 0,
      ...(hasDescription ? { description: "" } : {}),
    });
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
      ...(hasDescription ? { description: form.description?.trim() || "" } : {}),
    };

    const url = editing === "new" ? apiBase : `${apiBase}/${editing}`;
    const method = editing === "new" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      onRefresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category? Items must be moved first.")) return;
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (res.ok) {
      onRefresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-sans text-lg font-semibold tracking-tight mb-0.5">{title}</h2>
          <p className="text-xs text-sand-500">{description}</p>
        </div>
        <button onClick={startNew} className="btn-primary text-xs px-3 py-1.5">
          + Add
        </button>
      </div>

      {/* Edit/New form */}
      {editing && (
        <div className="card p-5 mb-5">
          <h3 className="font-sans text-sm font-semibold mb-3">
            {editing === "new" ? "New Category" : "Edit Category"}
          </h3>
          {error && <p className="text-xs text-rose-600 mb-3">{error}</p>}

          <div className={`grid ${hasDescription ? "grid-cols-2" : "grid-cols-3"} gap-3 mb-3`}>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder={slugify(form.name || "auto-generated")}
                className={inputClass} />
            </div>
            {!hasDescription && (
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className={inputClass} />
              </div>
            )}
          </div>

          {hasDescription && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Description</label>
                <input type="text" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description for this category"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className={inputClass} />
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="btn-outline text-xs px-3 py-1.5">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-xs px-4 py-1.5 disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Category list */}
      {categories.length === 0 ? (
        <p className="text-sm text-sand-500 py-4">No categories yet.</p>
      ) : (
        <div className="space-y-0">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-medium text-neutral-900 dark:text-sand-100">{cat.name}</span>
                <span className="text-xs text-sand-500 font-mono">/{cat.slug}</span>
                {cat.description && (
                  <span className="text-xs text-sand-400 truncate hidden md:inline">— {cat.description}</span>
                )}
                <span className="text-xs text-sand-500 tabular-nums">
                  {cat._count?.products ?? cat._count?.threads ?? 0} {countLabel}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[0.65rem] text-sand-400 tabular-nums">#{cat.sortOrder}</span>
                <button onClick={() => startEdit(cat)} className="text-xs text-rugged-500 hover:text-rugged-600">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="text-xs text-sand-500 hover:text-rose-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryManager() {
  const [shopCategories, setShopCategories] = useState([]);
  const [forumCategories, setForumCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [shopRes, forumRes] = await Promise.all([
      fetch("/api/shop/categories"),
      fetch("/api/forum/categories"),
    ]);
    setShopCategories(await shopRes.json());
    setForumCategories(await forumRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  if (loading) return <p className="text-sm text-sand-500">Loading categories...</p>;

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Categories</h1>
        <p className="text-sm text-sand-500">Manage categories for the shop and forum.</p>
      </div>

      {/* Shop categories */}
      <div className="mb-12">
        <CategorySection
          title="Shop Categories"
          description={`${shopCategories.length} categories for product organization.`}
          apiBase="/api/shop/categories"
          categories={shopCategories}
          onRefresh={fetchAll}
          countLabel="products"
          hasDescription={false}
        />
      </div>

      {/* Divider */}
      <div className="mb-12" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }} />

      {/* Forum categories */}
      <CategorySection
        title="Forum Categories"
        description={`${forumCategories.length} categories for forum discussions.`}
        apiBase="/api/forum/categories"
        categories={forumCategories}
        onRefresh={fetchAll}
        countLabel="threads"
        hasDescription={true}
      />
    </div>
  );
}
