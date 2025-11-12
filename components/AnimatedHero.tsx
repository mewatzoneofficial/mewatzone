// components/AnimatedHero.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function AnimatedHero() {
  return (
    <section className="text-center py-10 bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 text-white relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md"
      >
        Welcome to <span className="text-yellow-300">NextShop</span> 🛒
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto"
      >
        Discover amazing products at unbeatable prices.  
        Shop smarter and faster — all in one place.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
        <Link
          href="/products"
          className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 shadow-lg"
        >
          🛍️ Shop Now
        </Link>
      </motion.div>
    </section>
  )
}
