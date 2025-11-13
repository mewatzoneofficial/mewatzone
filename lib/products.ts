import axios from "axios"

export async function getProducts() {
  const response = await axios.get("http://localhost:8080/api/products")
  return response.data.data.responseData
}

export async function getCategories() {
  const response = await axios.get("http://localhost:8080/api/categories")
  return response.data.data.results
}

export async function getProduct(id: string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return res.data
}

export async function getProductDetail(id: string) {
  const response = await axios.get(`http://localhost:8080/api/products/${id}`)
  return response.data.data
}
