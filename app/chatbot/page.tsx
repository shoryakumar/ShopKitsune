"use client";

import React, { useState } from "react";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 How can I help you shop today?" },
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", input);
      const res = await fetch("http://localhost:8000/chatbot", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to send");
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.response }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100 animate-fadeInUp">
        <span className="text-4xl mb-2">🦊</span>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Shopping Assistant Chatbot</h1>
        <p className="mb-6 text-gray-600 text-center">Chat with our AI-powered shopping assistant for personalized help and recommendations.</p>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col h-96 max-h-[32rem] w-full animate-fadeInUp">
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl max-w-xs text-base shadow-md animate-fadeInUp ${msg.from === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-blue-100 text-gray-800 rounded-bl-none"}`} style={{ animationDelay: `${idx * 100}ms` }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl max-w-xs text-base shadow-md bg-white border border-blue-100 text-gray-800 rounded-bl-none animate-fadeInUp opacity-60">...
                </div>
              </div>
            )}
          </div>
          <form className="flex items-center gap-2" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow hover:bg-blue-700 transition-all disabled:opacity-60"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
          <div className="text-xs text-gray-400 mt-2">Live chat powered by FastAPI backend!</div>
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