"use client";

import React, { useState, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Classic Blue Jeans",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Minimalist White Tee",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Streetwear Hoodie",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
];

export default function VirtualTryOnPage() {
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get("productId"));
  const selectedProduct = useMemo(() => products.find(p => p.id === productId), [productId]);

  const [started, setStarted] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<null | { result: string; image_filename: string; composite_url?: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setResult(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setImage(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image to try on.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", image);
      if (selectedProduct) formData.append("product_id", String(selectedProduct.id));
      const res = await fetch("http://localhost:8000/virtual-tryon", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp">
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Virtual Try-On</h1>
        <p className="mb-2 text-gray-600 text-center">Try on outfits virtually with AI-powered image upload.</p>
        {selectedProduct && (
          <div className="mb-4 flex flex-col items-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 object-cover rounded-xl border mb-2" />
            <div className="font-bold text-blue-700">{selectedProduct.name}</div>
          </div>
        )}
        <div className="w-full flex flex-col items-center">
          {!started ? (
            <button
              onClick={() => setStarted(true)}
              className="mb-6 w-full px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow hover:bg-blue-700 transition-all"
            >
              Start AI Try-On
            </button>
          ) : null}
          {started && (
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow hover:bg-blue-700 transition-all"
                disabled={loading}
              >
                {loading ? "Processing..." : "Upload & Try On"}
              </button>
            </form>
          )}
          {/* Image Preview and Result */}
          {result && result.composite_url ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10 w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50 via-pink-50 to-white border border-blue-100">
              {/* Original Image */}
              <div className="flex flex-col items-center flex-1">
                <span className="flex items-center gap-1 text-sm text-blue-700 mb-3 font-semibold tracking-wide uppercase">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/><path d="M12 12V4m0 0L3 9m9-5l9 5"/></svg>
                  Original
                </span>
                <div className="w-44 h-44 rounded-2xl border-2 border-blue-200 bg-blue-50 flex items-center justify-center overflow-hidden shadow-md">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Original Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              {/* Divider for desktop */}
              <div className="hidden md:flex flex-col items-center mx-2">
                <div className="w-0.5 h-32 bg-gradient-to-b from-blue-200 via-pink-200 to-pink-100 rounded-full opacity-70" />
              </div>
              {/* Try On Image */}
              <div className="flex flex-col items-center flex-1">
                <span className="flex items-center gap-1 text-sm text-pink-700 mb-3 font-semibold tracking-wide uppercase">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
                  Try On
                </span>
                <div className="w-44 h-44 rounded-2xl border-2 border-pink-200 bg-pink-50 flex items-center justify-center overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-pink-200 cursor-pointer">
                  <img src={result.composite_url} alt="AI Try-On Result" className="w-full h-full object-cover transition-all duration-300" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`w-64 h-80 rounded-2xl border-4 border-blue-200 bg-blue-50 flex items-center justify-center relative transition-all mt-6 ${started ? "shadow-2xl" : "opacity-60"}`}>
              {started && image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
              {!started && (
                <span className="text-gray-400 text-center px-4">AI preview will appear here after upload.</span>
              )}
            </div>
          )}
          {error && <div className="text-red-600 font-medium mt-4">{error}</div>}
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