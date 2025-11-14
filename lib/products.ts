import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is missing in your environment.");
}

console.log("API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getProducts() {
  try {
    const res = await api.get("/api/products");
    return res.data?.data?.responseData ?? [];
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

export async function getCategories() {
  try {
    const res = await api.get("/api/categories");
    return res.data?.data?.results ?? [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw err;
  }
}

export async function getProductDetail(id: string) {
  try {
    const res = await api.get(`/api/products/${id}`);
    return res.data?.data;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    throw err;
  }
}
