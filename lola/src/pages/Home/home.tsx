import { useState, useEffect } from 'react'
import Hero from '../../components/Hero/hero'
import FeaturedProducts from '../../components/FeaturedProducts/featuredProducts'
import Categories from '../../components/Categories/categories'
import Occasions from '../../components/Occasions/occasions'
import TrustFeatures from '../../components/TrustFeatures/trustFeatures'
import HelpSection from '../../components/HelpSection/helpSection'
import Api from '../../services/Api'
import './home.css'

const Home = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await Api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

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

      {/* Occasions Section */}
      <Occasions />

      {/* Trust Features Section */}
      <TrustFeatures />

      {/* Help Section */}
      <HelpSection />
    </div>
  )
}

export default Home
