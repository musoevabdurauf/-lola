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
