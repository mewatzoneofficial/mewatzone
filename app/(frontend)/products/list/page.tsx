"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { getProducts } from "@/lib/products";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  active: boolean;
}

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const onEdit = (product: Product) => {
    console.log("Edit:", product);
  };

  const onDelete = (id: number) => {
    console.log("Delete:", id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="p-3">{product.name}</td>
                <td className="p-3 font-medium">${product.price}</td>
                <td className="p-3">{product.stock}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg hover:bg-gray-200"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
