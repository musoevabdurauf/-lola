const API_BASE = 'http://localhost:5000/api'

export const slidesApi = {
  async getSlides() {
    const response = await fetch(`${API_BASE}/slides`)
    if (!response.ok) throw new Error('Failed to fetch slides')
    return response.json()
  },

  async getSlide(id: number) {
    const response = await fetch(`${API_BASE}/slides/${id}`)
    if (!response.ok) throw new Error('Failed to fetch slide')
    return response.json()
  },

  async createSlide(slide: any) {
    const response = await fetch(`${API_BASE}/slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide),
    })
    if (!response.ok) throw new Error('Failed to create slide')
    return response.json()
  },

  async updateSlide(id: number, slide: any) {
    const response = await fetch(`${API_BASE}/slides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide),
    })
    if (!response.ok) throw new Error('Failed to update slide')
    return response.json()
  },

  async deleteSlide(id: number) {
    const response = await fetch(`${API_BASE}/slides/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete slide')
    return response.json()
  },
}
