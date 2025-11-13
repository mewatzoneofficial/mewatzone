import axios from "axios"

export async function getProducts() {
  const response = await axios.get("http://localhost:8080/api/products")
  console.log('response products', response.data.data.responseData)
  return response.data.data.responseData
}

export async function getCategories() {
  const response = await axios.get("http://localhost:8080/api/categories")
  console.log('response categories', response.data.data.results)
  return response.data.data.results
}

export async function getProduct(id: string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return res.data
}

export async function getProductDetail(id: string) {
  const response = await axios.get(`http://localhost:8080/api/products/${id}`)
  console.log('response product details', response.data.data)
  return response.data.data
}
