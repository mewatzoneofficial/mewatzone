"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { showError } from "@/utils/toast";
import Link from "next/link";
import API_URL, { PRODUCT_TITLE, PRODUCT_TITLES } from "@/utils/config";
import Loader from "@/utils/Loaders";
import { HiArrowLeft, HiPencil } from "react-icons/hi";

interface Product {
  id: string;
  category_id: string;
  name: string;
  price: number;
  discount_price?: number;
  qty: number;
  image?: string;
  description?: string;
  is_active: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}api/products/${id}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch product");
        setProduct(data.data);
      } catch (err: any) {
        showError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, router]);

  if (loading) return <Loader />;

  if (!product) {
    return <p className="text-center py-6 text-red-500">Product not found.</p>;
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-semibold text-gray-800">
          {PRODUCT_TITLE} Details
        </h2>
        <Link
          href="/adminpnlx/products"
          className="inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 text-sm rounded-full hover:bg-blue-50 transition"
        >
          <HiArrowLeft /> Back to {PRODUCT_TITLES}
        </Link>
      </div>

      {/* Product Card */}
      <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
        {/* Product Image */}
        {product.image && (
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 rounded-xl object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              {product.name}
            </h3>

            <div className="mb-2">
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              {product.category_id}
            </div>

            <div className="mb-2 flex items-center gap-3">
              <span className="font-semibold text-gray-700">Price:</span>
              <span className="text-green-600 font-bold text-lg">
                ${product.price}
              </span>
              {product.discount_price && (
                <span className="text-red-500 line-through">
                  ${product.discount_price}
                </span>
              )}
            </div>

            <div className="mb-2">
              <span className="font-semibold text-gray-700">Quantity:</span>{" "}
              {product.qty}
            </div>

            <div
              className={`mb-2 inline-block px-3 py-1 rounded-full text-white font-medium ${
                product.is_active === "1" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {product.is_active === "1" ? "Active" : "Inactive"}
            </div>

            {product.description && (
              <p className="mt-4 text-gray-600">{product.description}</p>
            )}
          </div>

          {/* Edit Button */}
          <button
            onClick={() =>
              router.push(`/adminpnlx/products/${product.id}/edit`)
            }
            className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-2 py-2 rounded-full transition w-full md:w-auto flex items-center gap-2 justify-center"
          >
            <HiPencil /> Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
