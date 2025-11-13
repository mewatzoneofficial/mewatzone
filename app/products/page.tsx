"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts, getCategories } from "@/lib/products";
import Loader from "@/components/Loader";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("none");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productData);
        setCategories(categoryData);

        if (productData.length > 0) {
          const prices = productData.map((p) => p.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products or categories.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    switch (sortOption) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [products, selectedCategories, sortOption, priceRange]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortOption("none");
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  };

  if (loading)
    return (
      <Loader />
    );

  if (error)
    return (
      <section className="max-w-7xl mx-auto px-6 py-20 text-center text-red-500">
        {error}
      </section>
    );

  const minProductPrice =
    products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  const maxProductPrice =
    products.length > 0 ? Math.max(...products.map((p) => p.price)) : 1000;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* 🧭 Left Sidebar Filters */}
      <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit sticky top-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Filters</h2>

        <button
          onClick={clearFilters}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Clear Filters
        </button>

        {/* Sorting */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="none">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name (A–Z)</option>
          </select>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                  className="accent-pink-500 cursor-pointer"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              min={minProductPrice}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20 border border-gray-300 rounded-lg px-2 py-1"
            />
            <span className="text-gray-600">–</span>
            <input
              type="number"
              min={priceRange[0]}
              max={maxProductPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20 border border-gray-300 rounded-lg px-2 py-1"
            />
          </div>
        </div>
      </aside>

      {/* 🛍️ Product Grid */}
      <div className="md:col-span-3">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition"
              >
                <div className="bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 p-[2px] rounded-2xl mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-contain rounded-2xl bg-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 mb-4">${product.price}</p>
                <a
                  href={`/products/${product.id}`}
                  className="inline-block bg-gradient-to-r from-pink-500 via-purple-400 to-red-300 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
                >
                  View Product
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
