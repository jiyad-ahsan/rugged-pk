"use client";

import { useState, useEffect, useCallback } from "react";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProductManager({ categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // product id or "new"
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/shop/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const startEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      subtitle: product.subtitle || "",
      description: product.description || "",
      price: product.price,
      comparePrice: product.comparePrice || "",
      categoryId: product.categoryId,
      badge: product.badge || "",
      status: product.status,
      isKit: product.isKit,
      isFeatured: product.isFeatured,
      kitHighlight: product.kitHighlight || "",
      items: (product.items || []).join("\n"),
      sortOrder: product.sortOrder || 0,
    });
    setError("");
  };

  const startNew = () => {
    setEditing("new");
    setForm({
      name: "", slug: "", subtitle: "", description: "", price: "",
      comparePrice: "", categoryId: categories[0]?.id || "", badge: "",
      status: "coming_soon", isKit: false, isFeatured: false,
      kitHighlight: "", items: "", sortOrder: 0,
    });
    setError("");
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.categoryId) {
      setError("Name, price, and category are required");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      price: parseInt(form.price, 10),
      comparePrice: form.comparePrice ? parseInt(form.comparePrice, 10) : null,
      items: form.items ? form.items.split("\n").filter(Boolean) : [],
      sortOrder: parseInt(form.sortOrder, 10) || 0,
    };

    const url = editing === "new" ? "/api/shop/products" : `/api/shop/products/${editing}`;
    const method = editing === "new" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      fetchProducts();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/shop/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) return <p className="text-sm text-sand-500">Loading products...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-sans text-xl font-bold">Products ({products.length})</h2>
        <button onClick={startNew} className="btn-primary text-sm px-4 py-2">
          + Add product
        </button>
      </div>

      {/* Edit/New form */}
      {editing && (
        <div className="card p-6 mb-8">
          <h3 className="font-sans text-lg font-semibold mb-4">
            {editing === "new" ? "New Product" : "Edit Product"}
          </h3>
          {error && <p className="text-sm text-rose-600 mb-4">{error}</p>}

          <div className="grid grid-cols-2 gap-4 mb-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Price (PKR)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Compare Price</label>
              <input type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
                placeholder="Original price (optional)"
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none">
                <option value="coming_soon">Coming Soon</option>
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Badge</label>
              <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="local, branded, new..."
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
          </div>

          <div className="mb-4">
            <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none resize-y" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-sand-100">
              <input type="checkbox" checked={form.isKit} onChange={(e) => setForm({ ...form, isKit: e.target.checked })} />
              Kit product
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-sand-100">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured
            </label>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
            </div>
          </div>

          {form.isKit && (
            <>
              <div className="mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Kit Highlight</label>
                <input type="text" value={form.kitHighlight} onChange={(e) => setForm({ ...form, kitHighlight: e.target.value })}
                  placeholder="Start here, Most popular, Complete protection..."
                  className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none" />
              </div>
              <div className="mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-1 block">Kit Items (one per line)</label>
                <textarea value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} rows={6}
                  placeholder="9 meals — 1,800+ cal/day&#10;Water purification for 72L&#10;LED torch + batteries"
                  className="w-full px-3 py-2 text-sm bg-transparent border border-black/15 dark:border-white/10 rounded-sm text-neutral-900 dark:text-sand-100 focus:outline-none resize-y font-mono" />
              </div>
            </>
          )}

          <div className="flex gap-3 justify-end">
            <button onClick={() => setEditing(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-6 py-2 disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="space-y-0">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-sm font-medium text-neutral-900 dark:text-sand-100">{p.name}</span>
              {p.isKit && <span className="text-[0.6rem] uppercase tracking-widest font-medium text-rugged-500 px-1.5 py-0.5 rounded-sm bg-rugged-500/10">kit</span>}
              <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-1.5 py-0.5 rounded-sm ${
                p.status === "available" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" :
                p.status === "coming_soon" ? "text-amber-600 bg-amber-50 dark:bg-amber-900/20" :
                "text-rose-600 bg-rose-50 dark:bg-rose-900/20"
              }`}>
                {p.status.replace("_", " ")}
              </span>
              <span className="text-xs text-sand-500">{p.category?.name}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm text-sand-600 tabular-nums">Rs. {p.price.toLocaleString("en-PK")}</span>
              <button onClick={() => startEdit(p)} className="text-xs text-rugged-500 hover:text-rugged-600">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-xs text-sand-500 hover:text-rose-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
