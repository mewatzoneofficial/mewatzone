"use client";

import { useEffect, useMemo, useState } from "react";
import Loader from "@/app/(frontend)/components/Loader";
import { AnimatedProductCard } from "@/app/(frontend)/components/AnimatedProductCard";
import Pagination from "@/app/adminpnlx/componants/Pagination";
import API_URL from "@/utils/config";

interface Product {
  id: number;
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
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("none");
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchName, setSearchName] = useState<string>("");

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        // Build query for products
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (searchName) queryParams.append("name", searchName);

        // Fetch categories (no pagination)
        const cateResponse = await fetch(`${API_URL}api/categories`);
        const cateData = await cateResponse.json();
        setCategories(cateData.data.results || []);

        // Fetch products
        const response = await fetch(`${API_URL}api/products?${queryParams}`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.data?.message || "Failed to load products");
        }

        const productData = responseData.data.responseData || [];

        setProducts(productData);
        setTotalPages(responseData.data.totalPages);
        setTotalEntries(responseData.data.total);

      } catch (err) {
        setError("Failed to load products or categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, searchName]);

  // Min/max price
  const [minProductPrice, maxProductPrice] = useMemo(() => {
    if (products.length === 0) return [0, 1000];
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    switch (sortOption) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [products, selectedCategories, sortOption, priceRange]);

  // Category toggle
  const handleCategoryChange = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSortOption("none");
    setPriceRange([minProductPrice, maxProductPrice]);
    setSearchName("");
  };

  // Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

return (
  <section className="m-5">

    {/* 12-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

      {/* HEADER — FULL WIDTH (12/12) */}
      <header className="col-span-12 mb-5 p-4 rounded-xl shadow-md bg-white">
        <h3 className="font-semibold mb-1">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="none">Default</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="name-asc">Name A–Z</option>
        </select>
      </header>

      {/* ASIDE — 2 COLUMNS (2/12) */}
      <aside className="col-span-12 md:col-span-3 bg-white p-6 rounded-xl shadow-md h-fit">

        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full border mb-4 p-2 rounded"
        />

        <button
          onClick={clearFilters}
          className="w-full bg-purple-500 text-white py-2 rounded mt-2"
        >
          Clear Filters
        </button>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Categories</h3>
          {categories.map((cat) => (
            <label key={cat.id} className="block">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => handleCategoryChange(cat.name)}
              />
              <span className="ml-2">{cat.name}</span>
            </label>
          ))}
        </div>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-20 border rounded p-1"
          />
          <span className="mx-2">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-20 border rounded p-1"
          />
        </div>
      </aside>

      {/* MAIN PRODUCTS SECTION — 10 COLUMNS (10/12) */}
      <div className="col-span-12 md:col-span-9">

        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <AnimatedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  </section>
);

}
