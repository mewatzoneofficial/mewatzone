"use client"
import { useCart } from "@/app/(frontend)/components/CartProvider"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0)

  function handleCheckout() {
    alert("Payment successful! 🎉")
    clearCart()
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-6">Total: <span className="font-semibold">${total.toFixed(2)}</span></p>
      <button
        onClick={handleCheckout}
        className="bg-black text-white px-6 py-3 rounded-xl w-full"
      >
        Pay Now
      </button>
    </div>
  )
}
