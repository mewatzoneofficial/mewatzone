import axios from "axios"

export async function getProducts() {
  const res = await axios.get("https://fakestoreapi.com/products")
  return res.data
}

export async function getProduct(id: string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return res.data
}
