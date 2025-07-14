"use client";

import React, { useRef, useState } from "react";

export default function StyleProfilePage() {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { profile: string; description: string; image_filename: string | null }>(null);
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

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image && !description.trim()) {
      setError("Please upload an image or enter a style description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (description) formData.append("description", description);
      const res = await fetch("http://localhost:8000/profile/style", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to process. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp">
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Style Profile</h1>
        <p className="mb-6 text-gray-600 text-center">Upload an image or describe your style to get personalized fashion recommendations powered by AI.</p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block font-medium mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Or Describe Your Style</label>
            <textarea
              value={description}
              onChange={handleTextChange}
              rows={3}
              placeholder="e.g. Minimalist, streetwear, bold colors..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
            />
          </div>
          {error && <div className="text-red-600 font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow hover:bg-blue-700 transition-all"
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Recommendations"}
          </button>
        </form>
        {/* Preview Section */}
        {(image || description) && !result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 w-full animate-fadeInUp">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Your Style Preview</h2>
            {image && (
              <img src={URL.createObjectURL(image)} alt="Uploaded style" className="w-40 h-40 object-cover rounded-xl mb-4 border mx-auto" />
            )}
            {description && (
              <div className="text-gray-700 text-center"><span className="font-semibold">Description:</span> {description}</div>
            )}
          </div>
        )}
        {result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200 w-full animate-fadeInUp">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Profile Result</h2>
            <div className="text-gray-700 text-center mb-2"><span className="font-semibold">Profile:</span> {result.profile}</div>
            <div className="text-gray-700 text-center mb-2"><span className="font-semibold">Description:</span> {result.description}</div>
            {result.image_filename && (
              <div className="text-gray-700 text-center"><span className="font-semibold">Image:</span> {result.image_filename}</div>
            )}
          </div>
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