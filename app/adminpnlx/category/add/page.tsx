"use client";
import API_URL, { CATEGORY_TITLE } from "@/utils/config";
import { showError, showSuccess } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";

interface ProductFormData {
  name: string;
  description?: string;
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
      name: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      const res = await fetch(`${API_URL}api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add Category");

      showSuccess(data.message || "Category added successfully");
      reset();
      router.push("/adminpnlx/category");
    } catch (err: any) {
      showError(err.message || "Failed to add Category.");
    }
  };

  return (
    <div className="mx-auto py-2">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-2xl font-semibold">Add {CATEGORY_TITLE}</h4>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <Link
            href="/adminpnlx/category"
            className="inline-flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 text-sm rounded-full hover:bg-blue-50 transition"
          >
            <HiArrowLeft /> Back to {CATEGORY_TITLE}
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="font-medium"> Name</label>
            <input
              type="text"
              {...register("name", { required: "Category name is required." })}
              className={`mt-1 w-full border rounded-lg p-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Category Name"
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
              placeholder="Enter Category Description..."
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
