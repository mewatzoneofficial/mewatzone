"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/app/adminpnlx/componants/Pagination";
import Link from "next/link";
import API_URL from "@/utils/config";
import { PRODUCT_TITLE } from "@/utils/config";
import { showSuccess, showError, confirmAction } from "@/utils/toast";
import { formatDMY } from "@/utils/common";

interface Staff {
  adminID: number;
  name: string;
  official_email: string;
  mobile: string;
  created_at: string;
}

interface FetchResponse {
  data: {
    results: Staff[];
    page: number;
    totalPages: number;
    total: number;
  };
}

const Listing: React.FC = () => {
  const [results, setResults] = useState<Staff[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchMobile, setSearchMobile] = useState<string>("");

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber.toString(),
        limit: limit.toString(),
      });

      if (searchName) queryParams.append("name", searchName);
      if (searchEmail) queryParams.append("email", searchEmail);
      if (searchMobile) queryParams.append("mobile", searchMobile);

      const res = await fetch(`${API_URL}staffs?${queryParams.toString()}`);
      const data: FetchResponse = await res.json();

      setResults(Array.isArray(data.data.results) ? data.data.results : []);
      setPage(data.data.page || 1);
      setTotalPages(data.data.totalPages || 1);
      setTotalEntries(data.data.total || 0);
    } catch (err) {
      console.error("Error loading users:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await confirmAction({
      text: "You want to delete this?",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}staffs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      await showSuccess("User has been deleted successfully.");
      fetchUsers(page);
    } catch (err: any) {
      await showError(err.message || "Failed to delete user.");
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1);
  };

  const handleReset = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchMobile("");
    setPage(1);
    fetchUsers(1);
  };

  useEffect(() => {
    fetchUsers(1);
  }, [searchName, searchEmail, searchMobile]);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{PRODUCT_TITLE}s</h2>

        <Link
          href="/staffs/create"
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
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Search Email"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile</label>
            <input
              type="text"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              placeholder="Search Mobile"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-5">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Mobile No.</th>
                  <th className="border p-2">Create Date</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-3">
                      Record Not Found.
                    </td>
                  </tr>
                ) : (
                  results.map((result) => (
                    <tr key={result.adminID} className="hover:bg-gray-50">
                      <td className="border p-2">{result.adminID}</td>
                      <td className="border p-2">{result.name}</td>
                      <td className="border p-2">{result.official_email}</td>
                      <td className="border p-2">{result.mobile}</td>
                      <td className="border p-2">
                        {formatDMY(result.created_at)}
                      </td>
                      <td className="border p-2 text-center">
                        <Link
                          href={`/staffs/edit/${result.adminID}`}
                          className="text-yellow-600 font-medium mr-4 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          className="text-red-600 font-medium hover:underline"
                          onClick={() => handleDelete(result.adminID)}
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
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalEntries)} of{" "}
            {totalEntries} entries
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
