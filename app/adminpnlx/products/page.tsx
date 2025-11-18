"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/app/adminpnlx/componants/Pagination";
import Link from "next/link";
import API_URL, { PRODUCT_TITLE } from "@/utils/config";
import { showSuccess, showError, confirmAction } from "@/utils/toast";
import { formatDMYShortMonth } from "@/utils/common";
import Loader from "@/utils/Loaders";

interface Product {
  id: number;
  name: string;
  price: string;
  category_id: string;
  cat_name: string;
  image: string;
  created_at: string;
}

interface FetchResponse {
  data: {
    responseData: Product[];
    page: number;
    totalPages: number;
    total: number;
  };
}

const Listing: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchName, setSearchName] = useState<string>("");
  const [searchPrice, setSearchPrice] = useState<string>("");
  const [searchcategory_id, setSearchcategory_id] = useState<string>("");

  // Fetch Products (NOT wrapped in useCallback)
  const fetchResults = async (pageNumber = 1) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        page: String(pageNumber),
        limit: String(limit),
      });

      if (searchName) queryParams.append("name", searchName);
      if (searchPrice) queryParams.append("price", searchPrice);
      if (searchcategory_id)
        queryParams.append("category_id", searchcategory_id);

      const res = await fetch(`${API_URL}api/products?${queryParams}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load data");

      const data: FetchResponse = await res.json();

      setResults(
        Array.isArray(data.data.responseData) ? data.data.responseData : []
      );
      setPage(data.data.page || 1);
      setTotalPages(data.data.totalPages || 1);
      setTotalEntries(data.data.total || 0);
    } catch (error) {
      console.error("Error loading products:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    fetchResults(page);
  }, [page]);

  // Search triggers page reset + fetch
  useEffect(() => {
    setPage(1);
    fetchResults(1);
  }, [searchName, searchPrice, searchcategory_id]);

  // Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Delete Product
  const handleDelete = async (id: number) => {
    const isConfirmed = await confirmAction({
      text: "You want to delete this?",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await showSuccess("Product deleted successfully.");
      fetchResults(page);
    } catch (err: any) {
      await showError(err.message || "Failed to delete product.");
    }
  };

  // Reset Search
  const handleReset = () => {
    setSearchName("");
    setSearchPrice("");
    setSearchcategory_id("");
    setPage(1);
    fetchResults(1);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{PRODUCT_TITLE}s</h2>

        <Link
          href="/adminpnlx/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add New {PRODUCT_TITLE}
        </Link>
      </div>

      {/* Search Box */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search Name"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="text"
              value={searchPrice}
              onChange={(e) => setSearchPrice(e.target.value)}
              placeholder="Search Price"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category ID</label>
            <input
              type="text"
              value={searchcategory_id}
              onChange={(e) => setSearchcategory_id(e.target.value)}
              placeholder="Search Category"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => fetchResults(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-5">
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Create Date</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-3">
                      No Records Found.
                    </td>
                  </tr>
                ) : (
                  results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="border p-2">{result.id}</td>
                      <td className="border p-2">
                        {result.image && (
                          <img
                            src={result.image}
                            alt={result.name}
                            className="h-20 w-auto rounded-xl border"
                          />
                        )}
                      </td>

                      <td className="border p-2">{result.name}</td>
                      <td className="border p-2">{result.price}</td>
                      <td className="border p-2">{result.cat_name}</td>
                      <td className="border p-2">
                        {formatDMYShortMonth(result.created_at)}
                      </td>
                      <td className="border p-2 text-center">
                        <Link
                          href={`/adminpnlx/products/${result.id}`}
                          className="text-blue-600 font-medium mr-4 hover:underline"
                        >
                          View
                        </Link>
                        <Link
                          href={`/adminpnlx/products/${result.id}/edit`}
                          className="text-yellow-600 font-medium mr-4 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 font-medium hover:underline"
                          onClick={() => handleDelete(result.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Info */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalEntries)} of {totalEntries} entries
          </p>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Listing;
