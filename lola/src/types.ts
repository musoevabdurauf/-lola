export interface Product {
  id: string
  name: string
  price: number
  description: string
  badge: string
  isNew: boolean
  isHit: boolean
  category: string
  composition: string
  height: string
  care: string
  image?: string
  stock?: number
}

export interface Category {
  id: number
  name: string
  path: string
  count?: string
  image: string
}

export interface Slide {
  id: number
  image: string
  title: string
  description: string
}

export type OrderStatus = 'new' | 'confirmed' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  productId: string
  productName: string
  productImage?: string
  price: number
  quantity: number
  total: number
  customerName: string
  customerPhone: string
  comment?: string
  status: OrderStatus
  createdAt: string
}

export interface CreateOrderPayload {
  productId: string
  quantity: number
  customerName: string
  customerPhone: string
  comment?: string
}
