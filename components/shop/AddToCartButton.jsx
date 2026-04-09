"use client";

import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ product }) {
  const { addToCart, setCartOpen } = useCart();

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
    });
    setCartOpen(true);
  };

  return (
    <button onClick={handleAdd} className="btn-primary w-full text-center mt-4">
      Add to cart →
    </button>
  );
}
