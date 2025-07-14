import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopKitsune",
  description: "AI-powered shopping assistant with fashion recommendations, virtual try-on, and a gamified loyalty program.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/style-profile", label: "Style Profile" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/virtual-tryon", label: "Virtual Try-On" },
  { href: "/chatbot", label: "Chatbot" },
  { href: "/loyalty", label: "Loyalty Dashboard" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50`}> 
        {/* Sticky Glassy Navbar */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-700 tracking-tight">🦊 ShopKitsune</span>
          </div>
          <ul className="hidden md:flex space-x-4 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1 rounded transition font-semibold hover:text-blue-700 hover:bg-blue-100/60`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full flex flex-col min-h-[calc(100vh-64px)]">
          {children}
        </div>
        {/* Elegant Footer */}
        <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur py-8 px-4 flex flex-col items-center text-gray-600 text-sm mt-12">
          <div className="font-bold text-blue-700 text-lg mb-2">🦊 ShopKitsune</div>
          <div className="flex space-x-6 mb-2">
            <a href="#" className="hover:text-blue-600 transition">About</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">GitHub</a>
          </div>
          <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} ShopKitsune. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
