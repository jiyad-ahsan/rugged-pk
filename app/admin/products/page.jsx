"use client";

import { useState, useEffect } from "react";
import ProductManager from "@/components/admin/ProductManager";

export default function AdminProductsPage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("/api/shop/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.map((c) => ({ id: c.id, name: c.name }))))
      .catch(() => setCategories([]));
  }, []);

  if (!categories) return <p className="text-sm text-sand-500">Loading...</p>;

  return <ProductManager categories={categories} />;
}
