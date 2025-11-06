import { AnimatedHero } from "@/components/AnimatedHero";
import { AnimatedProductCard } from "@/components/AnimatedProductCard";
import Footer from "@/components/Footer";
import { SimpleProductCard } from "@/components/SimpleProductCard";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const topProducts = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnimatedHero />

      {/* 🥇 Top Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          🥇 Top Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {topProducts.slice(0, 4).map((product: any) => (
            <SimpleProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 bg-clip-text text-transparent">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {topProducts.slice(0, 4).map((product: any) => (
            <AnimatedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
