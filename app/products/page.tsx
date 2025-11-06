import { getProducts } from "@/lib/products"
import ProductCard from "@/components/ProductCard"
export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    
  )
}
