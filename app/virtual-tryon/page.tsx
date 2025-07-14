"use client";

import React, { useState, useRef } from "react";

export default function VirtualTryOnPage() {
  const [tab, setTab] = useState<"ar" | "ai">("ar");
  // AI Try-On state
  const [started, setStarted] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<null | { result: string; image_filename: string }>();
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
        <p className="mb-6 text-gray-600 text-center">Try on outfits virtually using your camera (AR) or AI-powered image upload.</p>
        {/* Tabs */}
        <div className="flex w-full mb-8">
          <button
            className={`flex-1 py-2 rounded-l-full font-bold text-lg transition-all ${tab === "ar" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            onClick={() => setTab("ar")}
          >
            Live AR Try-On
          </button>
          <button
            className={`flex-1 py-2 rounded-r-full font-bold text-lg transition-all ${tab === "ai" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            onClick={() => setTab("ai")}
          >
            AI-Powered Try-On
          </button>
        </div>
        {/* Tab Content */}
        {tab === "ar" && <ARjsSection />}
        {tab === "ai" && (
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
            {error && <div className="text-red-600 font-medium mt-4">{error}</div>}
            {result && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 w-full text-center animate-fadeInUp">
                <div className="text-lg font-bold text-blue-700 mb-2">{result.result}</div>
                <div className="text-gray-700">Image: {result.image_filename}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function ARjsSection() {
  // This is a simple AR.js/A-Frame embed for demo purposes
  // In production, you may want to use a React wrapper or more advanced integration
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-64 h-80 rounded-2xl border-4 border-blue-200 bg-blue-50 flex items-center justify-center relative shadow-2xl mb-4 overflow-hidden">
        {/* AR.js/A-Frame scene */}
        <iframe
          title="AR.js Live Try-On"
          srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <script src='https://aframe.io/releases/1.2.0/aframe.min.js'></script>
    <script src='https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js'></script>
    <style>body { margin: 0; overflow: hidden; }</style>
  </head>
  <body>
    <a-scene embedded arjs>
      <a-marker preset='hiro'>
        <a-box position='0 0.5 0' material='color: #4F46E5;'></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </body>
</html>`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="camera; fullscreen"
        />
      </div>
      <div className="text-gray-700 text-center text-sm">
        <b>Live AR Try-On:</b> Point your camera at a <a href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/aframe/examples/marker-training/examples/pattern-files/pattern-hiro.png" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Hiro marker</a> to see a 3D box overlay.<br/>
        (Replace with clothing overlays for production.)
      </div>
    </div>
  );
}

// Add fadeInUp animation
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } } .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both; }`;
  document.head.appendChild(style);
} 