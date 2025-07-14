"use client";

import React, { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Classic Blue Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Minimalist White Tee",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Streetwear Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ShopPage() {
  const [buying, setBuying] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy(productId: number) {
    setBuying(productId);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:8000/shop/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });
      if (!res.ok) throw new Error("Purchase failed");
      setSuccess(true);
    } catch (err) {
      setError("Purchase failed. Please try again.");
    } finally {
      setBuying(null);
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp">
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Shop</h1>
        <p className="mb-6 text-gray-600 text-center">Browse and buy the latest fashion. Purchases earn you loyalty points!</p>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-bold text-center w-full">
            Purchase successful! <Link href="/loyalty" className="underline text-blue-700 ml-2">View your Loyalty Dashboard</Link>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-bold text-center w-full">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {products.map((product) => (
            <div key={product.id} className="bg-blue-50 rounded-2xl shadow p-4 flex flex-col items-center border border-blue-100 animate-fadeInUp">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-xl mb-3 border" />
              <div className="font-bold text-lg text-blue-700 mb-1">{product.name}</div>
              <div className="text-gray-700 mb-2">${product.price.toFixed(2)}</div>
              <div className="flex gap-2 w-full mt-2">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold text-base shadow hover:bg-blue-700 transition-all disabled:opacity-60 flex-1"
                  onClick={() => handleBuy(product.id)}
                  disabled={buying === product.id}
                >
                  {buying === product.id ? "Buying..." : "Buy"}
                </button>
                <Link
                  href={`/virtual-tryon?productId=${product.id}`}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full font-semibold text-base shadow hover:bg-pink-600 transition-all flex-1 text-center"
                >
                  Try On
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// Add fadeInUp animation
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } } .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both; }`;
  document.head.appendChild(style);
} 