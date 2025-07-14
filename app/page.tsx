"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "Style Profiling",
    description:
      "Upload an image or describe your style. Our AI analyzes your preferences for personalized fashion recommendations.",
    icon: "/file.svg",
  },
  {
    title: "AI Recommendations",
    description:
      "Receive curated outfit suggestions powered by advanced machine learning and collaborative filtering.",
    icon: "/next.svg",
  },
  {
    title: "Virtual Try-On",
    description:
      "Try on clothes virtually in your browser using AR.js and your device camera.",
    icon: "/window.svg",
  },
  {
    title: "Shopping Chatbot",
    description:
      "Chat with our AI assistant for instant help, advice, and product discovery.",
    icon: "/globe.svg",
  },
  {
    title: "Loyalty Program",
    description:
      "Earn points, badges, and rewards for purchases, reviews, and referrals. Track your progress on your dashboard.",
    icon: "/vercel.svg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-0 px-0 w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-500 via-indigo-400 to-pink-300 py-16 px-4 flex flex-col items-center text-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/globe.svg')] bg-no-repeat bg-center bg-contain pointer-events-none" />
        <span className="text-6xl md:text-7xl mb-4 block">🦊</span>
        <span className="inline-block bg-white/80 text-blue-700 font-bold px-4 py-1 rounded-full text-xs mb-4 shadow">Walmart Hackathon 2025</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow mb-4">ShopKitsune</h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-medium drop-shadow">
          AI-powered shopping assistant with fashion recommendations, virtual try-on, and a gamified loyalty program for long-term customer engagement.
        </p>
        <Link href="/style-profile" className="inline-block px-10 py-4 bg-white text-blue-700 text-lg font-bold rounded-full shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-200">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-16 px-4 -mt-12 z-10">
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={i * 100}
          />
        ))}
      </section>
    </main>
  );
}

function FeatureCard({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: number }) {
  return (
    <div
      className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-start hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
      style={{ animation: `fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) ${delay}ms both` }}
    >
      <div className="w-14 h-14 mb-5 flex items-center justify-center bg-blue-100 rounded-full group-hover:bg-blue-600 group-hover:scale-110 transition-all">
        <Image src={icon} alt="" width={36} height={36} className="group-hover:invert transition" />
      </div>
      <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-600 transition">{title}</h2>
      <p className="text-gray-600 group-hover:text-gray-800 transition">{description}</p>
    </div>
  );
}

// Add fadeInUp animation
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }`;
  document.head.appendChild(style);
}
