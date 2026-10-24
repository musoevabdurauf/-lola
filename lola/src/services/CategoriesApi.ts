import { request } from './http'
import type { Category } from '../types'

export const categoriesApi = {
  getCategories() {
    return request<Category[]>('/categories')
  },

  getCategory(id: number) {
    return request<Category>(`/categories/${id}`)
  },

  createCategory(category: Partial<Category>) {
    return request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    })
  },

  updateCategory(id: number, category: Partial<Category>) {
    return request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    })
  },

  deleteCategory(id: number) {
    return request<{ message: string }>(`/categories/${id}`, {
      method: 'DELETE',
    })
  },
}
