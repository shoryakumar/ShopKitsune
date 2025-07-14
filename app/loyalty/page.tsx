"use client";

import React, { useState, useEffect } from "react";

export default function LoyaltyDashboardPage() {
  const [data, setData] = useState<{ points: number; badges: string[]; rewards: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchLoyalty() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:8000/loyalty");
        if (!res.ok) throw new Error("Failed to fetch");
        const d = await res.json();
        setData(d);
        if (d.rewards && d.rewards.length > 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
      } catch (err) {
        setError("Failed to fetch loyalty info.");
      } finally {
        setLoading(false);
      }
    }
    fetchLoyalty();
  }, []);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp relative overflow-hidden">
        {showConfetti && <Confetti />}
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Loyalty Dashboard</h1>
        <p className="mb-6 text-gray-600 text-center">Track your points, badges, and rewards earned through purchases, reviews, and referrals.</p>
        {loading && <div className="text-blue-600 font-bold mb-4">Loading...</div>}
        {error && <div className="text-red-600 font-medium mb-4">{error}</div>}
        {data && (
          <>
            <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center w-full animate-fadeInUp">
              <div className="text-4xl font-extrabold text-blue-700 mb-2">{data.points} pts</div>
              <div className="text-gray-600 mb-2">Next reward at <span className="font-semibold">500 pts</span></div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min((data.points / 500) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {data.points >= 500 ? "Reward unlocked! 🎉" : `${500 - data.points} pts to go!`}
              </div>
            </div>
            <div className="mb-8 w-full">
              <h2 className="text-xl font-bold text-blue-700 mb-3">Badges</h2>
              <div className="flex flex-wrap gap-4">
                {data.badges.map((badge, i) => (
                  <div key={badge} className="flex flex-col items-center bg-white rounded-xl shadow p-4 border border-blue-100 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="text-3xl mb-1">🏅</span>
                    <span className="text-sm font-medium text-gray-700">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold text-blue-700 mb-3">Rewards</h2>
              <div className="flex flex-col gap-3">
                {data.rewards.map((reward, i) => (
                  <div
                    key={reward}
                    className={`flex items-center justify-between p-4 rounded-xl border text-lg font-semibold animate-fadeInUp bg-green-50 border-green-200 text-green-700`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span>{reward}</span>
                    <span className="font-bold">Unlocked 🎉</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Confetti() {
  // Simple confetti animation using absolute-positioned colored dots
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            background: `hsl(${Math.random() * 360}, 80%, 70%)`,
            opacity: 0.7,
            animation: `confetti-fall 1.5s ease-out ${Math.random()}s both`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          from { transform: translateY(-40px) scale(1.2); opacity: 1; }
          to { transform: translateY(60px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Add fadeInUp animation
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } } .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both; }`;
  document.head.appendChild(style);
} 