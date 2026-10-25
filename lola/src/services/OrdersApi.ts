import { request } from './http'
import type { CreateOrderPayload, Order, OrderStatus } from '../types'

export const ordersApi = {
  createOrder(payload: CreateOrderPayload) {
    return request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    })
  },

  getOrders() {
    return request<Order[]>('/orders')
  },

  updateStatus(id: string, status: OrderStatus) {
    return request<Order>(`/orders/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  },

  deleteOrder(id: string) {
    return request<{ message: string }>(`/orders/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
  },
}
