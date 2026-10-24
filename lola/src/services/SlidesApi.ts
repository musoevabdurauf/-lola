import { request } from './http'
import type { Slide } from '../types'

export const slidesApi = {
  getSlides() {
    return request<Slide[]>('/slides')
  },

  getSlide(id: number) {
    return request<Slide>(`/slides/${id}`)
  },

  createSlide(slide: Partial<Slide>) {
    return request<Slide>('/slides', {
      method: 'POST',
      body: JSON.stringify(slide),
    })
  },

  updateSlide(id: number, slide: Partial<Slide>) {
    return request<Slide>(`/slides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(slide),
    })
  },

  deleteSlide(id: number) {
    return request<{ message: string }>(`/slides/${id}`, {
      method: 'DELETE',
    })
  },
}
