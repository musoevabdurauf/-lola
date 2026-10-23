const API_BASE = 'http://localhost:5000/api'

export const categoriesApi = {
  async getCategories() {
    const response = await fetch(`${API_BASE}/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  },

  async getCategory(id: number) {
    const response = await fetch(`${API_BASE}/categories/${id}`)
    if (!response.ok) throw new Error('Failed to fetch category')
    return response.json()
  },

  async createCategory(category: any) {
    const response = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })
    if (!response.ok) throw new Error('Failed to create category')
    return response.json()
  },

  async updateCategory(id: number, category: any) {
    const response = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })
    if (!response.ok) throw new Error('Failed to update category')
    return response.json()
  },

  async deleteCategory(id: number) {
    const response = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete category')
    return response.json()
  },
}
