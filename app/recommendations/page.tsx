"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  async function handleGetRecommendations() {
    setLoading(true);
    setError("");
    setRecommendations(null);
    try {
      const res = await fetch("http://localhost:8000/recommendations");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp">
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Recommendations</h1>
        <p className="mb-6 text-gray-600 text-center">Your personalized fashion recommendations will appear here, powered by our AI engine.</p>
        <button
          onClick={handleGetRecommendations}
          className="w-full mb-8 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow hover:bg-blue-700 transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
        {error && <div className="text-red-600 font-medium mb-4">{error}</div>}
        {recommendations && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {recommendations.map((item, i) => (
              <div key={item.name} className="bg-blue-50 rounded-2xl shadow p-4 flex flex-col items-center border border-blue-100 hover:scale-105 hover:shadow-xl transition-all animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="font-bold text-lg text-blue-700 mb-1">{item.name}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-white text-blue-700 rounded text-xs font-medium border border-blue-200">{tag}</span>
                  ))}
                </div>
                <Link href="/shop" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm shadow hover:bg-blue-700 transition-all w-full text-center">Shop Now</Link>
              </div>
            ))}
          </div>
        )}
        {!recommendations && !loading && (
          <div className="text-gray-400 text-center mt-8">No recommendations yet. Click the button above to get started!</div>
        )}
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