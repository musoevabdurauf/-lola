import { useState, useEffect } from 'react'
import Hero from '../../components/Hero/hero'
import FeaturedProducts from '../../components/FeaturedProducts/featuredProducts'
import Categories from '../../components/Categories/categories'
import HelpSection from '../../components/HelpSection/helpSection'
import Api from '../../services/Api'
import type { Product } from '../../types'
import './home.css'

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      try {
        const data = await Api.getProducts()
        if (!cancelled) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="home">Загрузка...</div>
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts products={products} />

      {/* Categories Section */}
      <Categories />

      {/* Help Section */}
      <HelpSection />
    </div>
  )
}

export default Home
