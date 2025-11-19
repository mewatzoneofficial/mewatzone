"use client";
import API_URL, { PRODUCT_TITLE, PRODUCT_TITLES } from "@/utils/config";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import Loaders from "@/utils/Loaders";

interface ProductFormData {
  name: string;
  description?: string;
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams(); // get dynamic route params
  const productId = params.id; // matches [id] in route

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
    },
  });

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}api/categories/${productId}`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch categories");
        console.log("data", data.data);
        reset(data.data);
      } catch (err: any) {
        showError(err.message || "Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      const res = await fetch(`${API_URL}api/categories/${productId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update categories");

      showSuccess(data.message || "category updated successfully");
      router.push("/adminpnlx/category");
    } catch (err: any) {
      showError(err.message || "Failed to update categories.");
    }
  };

  if (loading) return <Loaders/>;

  return (
    <div className="mx-auto py-2">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-2xl font-semibold">Edit {PRODUCT_TITLE}</h4>
        <Link
          href="/adminpnlx/products"
          className="inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 text-sm rounded-full hover:bg-blue-50 transition"
        >
          <HiArrowLeft /> Back to {PRODUCT_TITLES}
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="font-medium">Product Name</label>
            <input
              type="text"
              {...register("name", { required: "Product name is required." })}
              className={`mt-1 w-full border rounded-lg p-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="font-medium">Description</label>
            <textarea
              {...register("description")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
              rows={4}
              placeholder="Product description..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent w-4 h-4 rounded-full"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save"></i> Update
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
