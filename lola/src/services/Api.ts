import { request } from './http'
import type { Product } from '../types'

interface Credentials {
  username: string
  password: string
}

interface AuthResponse {
  token: string
}

class Api {
  login(credentials: Credentials) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      skipAuth: true,
    })
  }

  getProducts() {
    return request<Product[]>('/products')
  }

  getProductById(id: string) {
    return request<Product>(`/products/${encodeURIComponent(id)}`)
  }

  createProduct(product: Partial<Product>) {
    return request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  updateProduct(id: string, product: Partial<Product>) {
    return request<Product>(`/products/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  deleteProduct(id: string) {
    return request<{ message: string }>(`/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
  }
}

export default new Api()
