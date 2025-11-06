"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "./CartProvider"
import LanguageSelector from "./LanguageSelector"

export default function Navbar() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("en")

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent hover:brightness-110 transition"
        >
          🛍️ NextShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-pink-500 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-pink-500 transition">
            Products
          </Link>
          <Link href="/contact" className="hover:text-pink-500 transition">
            Contact
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 hover:text-pink-500 transition"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white text-xs font-semibold px-2 py-[2px] rounded-full shadow">
                {cart.length}
              </span>
            )}
          </Link>

          {/* 🌐 Language Selector */}
          <LanguageSelector language={language} onChange={setLanguage} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-pink-500 transition"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="flex flex-col items-center py-4 space-y-3 text-gray-700 font-medium">
            <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition">
              Products
            </Link>
            <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition flex items-center gap-2">
              <ShoppingCart size={18} />
              Cart ({cart.length})
            </Link>

            {/* 🌐 Mobile Language Buttons */}
            <div className="flex gap-2 mt-2">
              {["en", "fr", "es"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`text-sm px-3 py-1 rounded-md border ${
                    language === code
                      ? "border-pink-400 text-pink-500 font-semibold"
                      : "border-gray-200 text-gray-600"
                  } hover:border-pink-300 hover:text-pink-400 transition`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
