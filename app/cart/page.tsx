"use client"
import { useCart } from "@/components/CartProvider"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  if (cart.length === 0)
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
        <Link href="/products" className="text-blue-600 underline">Go Shopping</Link>
      </div>
    )

  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.map((item:any) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500">${item.price}</p>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
        </div>
      ))}
      <div className="flex justify-between mt-6 text-xl font-semibold">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <div className="mt-6 flex gap-4">
        <Link href="/checkout" className="bg-black text-white px-6 py-3 rounded-xl">
          Checkout
        </Link>
        <button onClick={clearCart} className="border px-6 py-3 rounded-xl">
          Clear Cart
        </button>
      </div>
    </div>
  )
}
