"use client";

import { useState, useEffect, useCallback, useRef } from "react";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async (files) => {
    if (!files?.length) return;
    setUploading(true);

    const newImages = [...images];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const { url } = await res.json();
          newImages.push(url);
        } else {
          const data = await res.json();
          alert(data.error || "Upload failed");
        }
      } catch {
        alert("Upload failed — check your connection");
      }
    }

    onChange(newImages);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = async (index) => {
    const url = images[index];
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: url }),
      });
    } catch {}
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (from, to) => {
    if (to < 0 || to >= images.length) return;
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    onChange(reordered);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(Array.from(e.dataTransfer.files));
  };

  return (
    <div className="mb-4">
      <label className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-2 block">
        Images {images.length > 0 && `(${images.length})`}
      </label>

      {images.length > 0 && (
        <div className="flex gap-3 mb-3 flex-wrap">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="w-24 h-24 object-cover rounded-sm border border-black/10 dark:border-white/8"
              />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[0.5rem] font-mono bg-rugged-500 text-white px-1 py-0.5 rounded-sm uppercase">
                  Main
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-1">
                {i > 0 && (
                  <button type="button" onClick={() => moveImage(i, i - 1)}
                    className="text-white text-xs bg-black/40 px-1.5 py-1 rounded-sm hover:bg-black/60 border-none cursor-pointer">←</button>
                )}
                {i < images.length - 1 && (
                  <button type="button" onClick={() => moveImage(i, i + 1)}
                    className="text-white text-xs bg-black/40 px-1.5 py-1 rounded-sm hover:bg-black/60 border-none cursor-pointer">→</button>
                )}
                <button type="button" onClick={() => handleRemove(i)}
                  className="text-white text-xs bg-rose-600/80 px-1.5 py-1 rounded-sm hover:bg-rose-600 border-none cursor-pointer">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors
          ${dragOver ? "border-rugged-500 bg-rugged-500/5" : "border-black/15 dark:border-white/10 hover:border-rugged-500/50"}`}
      >
        {uploading ? (
          <p className="text-sm text-sand-500">Uploading...</p>
        ) : (
          <>
            <p className="text-sm text-sand-600 dark:text-sand-500 mb-1">Drop images here or click to browse</p>
            <p className="text-xs text-sand-500">JPEG, PNG, WebP or AVIF — max 5MB each</p>
          </>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif"
        multiple onChange={(e) => handleUpload(Array.from(e.target.files))} className="hidden" />
    </div>
  );
}

const statusConfig = {
  draft:       { label: "Draft",       color: "text-sand-500 bg-sand-200 dark:bg-sand-700" },
  available:   { label: "Available",   color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
  coming_soon: { label: "Coming soon", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
  sold_out:    { label: "Sold out",    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20" },
};

export default function ProductManager({ categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dragId, setDragId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/shop/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Drag and drop reorder
  const handleDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    // Make the drag ghost slightly transparent
    e.currentTarget.style.opacity = "0.4";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    setDragId(null);
    setDragOverId(null);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id !== dragOverId) setDragOverId(id);
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    setDragOverId(null);

    if (!dragId || dragId === targetId) return;

    const fromIndex = products.findIndex((p) => p.id === dragId);
    const toIndex = products.findIndex((p) => p.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    // Reorder the array
    const reordered = [...products];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    // Assign new sequential sortOrder values
    const updated = reordered.map((p, i) => ({ ...p, sortOrder: i }));
    setProducts(updated);

    // Save all changed sortOrders to the server
    const changes = updated.filter((p, i) => {
      const original = products.find((op) => op.id === p.id);
      return original && original.sortOrder !== i;
    });

    await Promise.all(
      changes.map((p) =>
        fetch(`/api/shop/products/${p.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: p.sortOrder }),
        })
      )
    );
  };

  // Quick status change from the list
  const quickSetStatus = async (id, status) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    await fetch(`/api/shop/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

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
      images: product.images || [],
      sortOrder: product.sortOrder ?? 5,
    });
    setError("");
  };

  const startNew = () => {
    setEditing("new");
    setForm({
      name: "", slug: "", subtitle: "", description: "", price: "",
      comparePrice: "", categoryId: categories[0]?.id || "", badge: "",
      status: "draft", isKit: false, isFeatured: false,
      kitHighlight: "", items: "", images: [], sortOrder: 5,
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

    const sortVal = parseInt(form.sortOrder, 10);
    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      subtitle: form.subtitle,
      description: form.description,
      price: parseInt(form.price, 10),
      comparePrice: form.comparePrice ? parseInt(form.comparePrice, 10) : null,
      categoryId: form.categoryId,
      badge: form.badge,
      status: form.status,
      isKit: form.isKit,
      isFeatured: form.isFeatured,
      kitHighlight: form.kitHighlight,
      items: form.items ? form.items.split("\n").filter(Boolean) : [],
      images: form.images || [],
      sortOrder: isNaN(sortVal) ? 5 : sortVal,
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

  const filtered = statusFilter === "all"
    ? products
    : products.filter((p) => p.status === statusFilter);

  if (loading) return <p className="text-sm text-sand-500">Loading products...</p>;

  const statusCounts = {};
  for (const p of products) {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Products</h1>
          <p className="text-sm text-sand-500">{products.length} products total.</p>
        </div>
        <button onClick={startNew} className="btn-primary text-sm px-4 py-2">
          + Add product
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "All", count: products.length },
          { key: "draft", label: "Draft", count: statusCounts.draft || 0 },
          { key: "available", label: "Available", count: statusCounts.available || 0 },
          { key: "coming_soon", label: "Coming Soon", count: statusCounts.coming_soon || 0 },
          { key: "sold_out", label: "Sold Out", count: statusCounts.sold_out || 0 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`text-xs font-mono px-3 py-1.5 rounded-sm cursor-pointer transition-all border
              ${statusFilter === tab.key
                ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900 border-transparent"
                : "bg-transparent text-sand-600 dark:text-sand-500 border-black/10 dark:border-white/10 hover:text-neutral-900 dark:hover:text-sand-100"
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
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
                <option value="draft">Draft</option>
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

          <ImageUploader
            images={form.images || []}
            onChange={(images) => setForm({ ...form, images })}
          />

          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-sand-100">
              <input type="checkbox" checked={form.isKit} onChange={(e) => setForm({ ...form, isKit: e.target.checked })} />
              Kit product
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-sand-100">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured
            </label>
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
                  placeholder={"9 meals — 1,800+ cal/day\nWater purification for 72L\nLED torch + batteries"}
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
        {filtered.length === 0 && (
          <p className="text-sm text-sand-500 py-8 text-center">No products in this category.</p>
        )}
        {filtered.map((p) => {
          const sc = statusConfig[p.status] || statusConfig.draft;
          const isDragging = dragId === p.id;
          const isDragOver = dragOverId === p.id && dragId !== p.id;
          return (
            <div
              key={p.id}
              draggable
              onDragStart={(e) => handleDragStart(e, p.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, p.id)}
              onDrop={(e) => handleDrop(e, p.id)}
              className={`flex items-center justify-between py-3 transition-colors ${isDragOver ? "bg-rugged-500/5" : ""}`}
              style={{
                borderBottom: "1px solid rgba(128,128,128,0.1)",
                borderTop: isDragOver ? "2px solid rgb(201, 75, 48)" : "2px solid transparent",
                cursor: "grab",
              }}
            >
              {/* Drag handle */}
              <div className="mr-3 shrink-0 text-sand-400 dark:text-sand-600 select-none" title="Drag to reorder">
                <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
                  <circle cx="3" cy="3" r="1.5" />
                  <circle cx="9" cy="3" r="1.5" />
                  <circle cx="3" cy="8" r="1.5" />
                  <circle cx="9" cy="8" r="1.5" />
                  <circle cx="3" cy="13" r="1.5" />
                  <circle cx="9" cy="13" r="1.5" />
                </svg>
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Thumbnail */}
                {p.images?.length > 0 ? (
                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-sm border border-black/10 dark:border-white/8 shrink-0" />
                ) : (
                  <div className="w-10 h-10 bg-sand-100 dark:bg-sand-800 rounded-sm border border-black/10 dark:border-white/8 flex items-center justify-center shrink-0">
                    <span className="text-xs text-sand-400">📦</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-neutral-900 dark:text-sand-100 block truncate">{p.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {p.isKit && <span className="text-[0.55rem] uppercase tracking-widest font-medium text-rugged-500 px-1 py-0.5 rounded-sm bg-rugged-500/10">kit</span>}
                    <span className={`text-[0.55rem] uppercase tracking-widest font-medium px-1 py-0.5 rounded-sm ${sc.color}`}>
                      {sc.label}
                    </span>
                    <span className="text-[0.6rem] text-sand-400">{p.category?.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Quick status toggle */}
                {p.status === "draft" && (
                  <button onClick={() => quickSetStatus(p.id, "available")}
                    className="text-[0.6rem] font-mono text-emerald-600 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-sm border-none cursor-pointer">
                    Publish
                  </button>
                )}
                {p.status === "available" && (
                  <button onClick={() => quickSetStatus(p.id, "draft")}
                    className="text-[0.6rem] font-mono text-sand-500 hover:text-sand-700 bg-sand-200 dark:bg-sand-700 px-2 py-1 rounded-sm border-none cursor-pointer">
                    Unpublish
                  </button>
                )}
                <span className="text-sm text-sand-600 tabular-nums w-24 text-right">Rs. {p.price.toLocaleString("en-PK")}</span>
                <button onClick={() => startEdit(p)} className="text-xs text-rugged-500 hover:text-rugged-600 bg-transparent border-none cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-xs text-sand-500 hover:text-rose-500 bg-transparent border-none cursor-pointer">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
