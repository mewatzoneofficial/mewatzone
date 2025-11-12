import axios from "axios"

export async function getProducts() {
  const response = await axios.get("http://localhost:8080/api/products")
  console.log('response', response.data.data.responseData)
  return response.data.data.responseData
}

export async function getProduct(id: string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return res.data
}
