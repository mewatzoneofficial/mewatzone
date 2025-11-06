import Link from "next/link"

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="h-48 w-full object-contain" />
      <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-500">${product.price}</p>
      <Link href={`/product/${product.id}`}>
        <button className="mt-3 bg-black text-white px-4 py-2 rounded-xl w-full">View Details</button>
      </Link>
    </div>
  )
}

