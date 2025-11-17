"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AnimatedProductCard({
  product,
}: {
  product: { id: number; name: string; price: number; image: string };
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100"
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 p-[0px] rounded-2xl mb-4 cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-contain rounded-2xl bg-white"
          />
        </div>
      </Link>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {product.name}
      </h3>

      <p className="text-gray-500 mb-4">${product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="inline-block bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
      >
        View Product
      </Link>
    </motion.div>
  );
}
