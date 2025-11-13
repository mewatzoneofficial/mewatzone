"use client"

import React from "react"
import { useCart } from "@/components/CartProvider"
import Loader from "@/components/Loader"
import { getProductDetail } from "@/lib/products"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Unwrap the promise
  const { id } = React.use(params)

  const { addToCart } = useCart()
  const [product, setProduct] = React.useState<any>(null)

  React.useEffect(() => {
    async function fetchProduct() {
      const data = await getProductDetail(id)
      console.log("datadatadata", data)
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  if (!product) return <Loader />

  return (
    <div className="p-8 flex flex-col md:flex-row gap-10">
      <img src={product.image} alt={product.title} className="w-80 h-80 object-contain" />
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-2xl font-semibold mt-4">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
