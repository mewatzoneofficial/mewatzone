"use client";
import API_URL, { PRODUCT_TITLE, PRODUCT_TITLES } from "@/utils/config";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";

interface ProductFormData {
  category_id: string;
  name: string;
  price: number;
  discount_price?: number;
  qty: number;
  image?: string;
  description?: string;
  is_active: string;
}

export default function AddProduct() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      category_id: "",
      is_active: "1",
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("category_id", formData.category_id);
      payload.append("name", formData.name);
      payload.append("price", formData.price.toString());
      if (formData.discount_price)
        payload.append("discount_price", formData.discount_price.toString());
      payload.append("qty", formData.qty.toString());
      payload.append("is_active", formData.is_active);
      if (formData.description)
        payload.append("description", formData.description);

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput?.files?.length) {
        payload.append("image", fileInput.files[0]);
      }

      const res = await fetch(`${API_URL}api/products`, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to added product");

      showSuccess(data.message || "Product added successfully");
      router.push("/adminpnlx/products");
    } catch (err: any) {
      showError(err.message || "Failed to added product.");
    }
  };

  return (
    <div className="mx-auto py-2">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-2xl font-semibold">Add {PRODUCT_TITLE}</h4>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <Link
            href="/adminpnlx/products"
            className="inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 text-sm rounded-full hover:bg-blue-50 transition"
          >
            <HiArrowLeft /> Back to {PRODUCT_TITLES}
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <select
              {...register("category_id", { required: "Select category." })}
              className={`mt-1 w-full border rounded-lg p-2 ${
                errors.category_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="1">Electronics</option>
              <option value="2">Fashion</option>
              <option value="3">Grocery</option>
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category_id.message}
              </p>
            )}
          </div>

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

          {/* Price */}
          <div>
            <label className="font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required." })}
              className={`mt-1 w-full border rounded-lg p-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Discount Price */}
          <div>
            <label className="font-medium">Discount Price</label>
            <input
              type="number"
              step="0.01"
              {...register("discount_price")}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
              placeholder="0.00"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              {...register("qty", { required: "Quantity required." })}
              className={`mt-1 w-full border rounded-lg p-2 ${
                errors.qty ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter quantity"
            />
            {errors.qty && (
              <p className="text-red-500 text-sm mt-1">{errors.qty.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="font-medium">Image</label>
            <input
              type="file"
              {...register("image", { required: "Image required." })}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
              placeholder="Image"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
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
                  <i className="fa-solid fa-save"></i> Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
