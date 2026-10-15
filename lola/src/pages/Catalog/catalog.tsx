import { useState, useEffect } from 'react'
import CatalogHeader from '../../components/CatalogHeader/catalogHeader'
import CatalogFilters from '../../components/CatalogFilters/catalogFilters'
import CatalogGrid from '../../components/CatalogGrid/catalogGrid'
import Api from '../../services/Api'
import './catalog.css'

const Catalog = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

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

  const filteredProducts = products.filter(product => {
    if (category === 'all') return true
    return product.category === category
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'new':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0)
    }
  })

  if (loading) {
    return <div className="catalog">Загрузка...</div>
  }

  return (
    <div className="catalog">
      <CatalogHeader />
      <div className="catalog-container">
        <CatalogFilters 
          category={category} 
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <CatalogGrid products={sortedProducts} />
      </div>
    </div>
  )
}

export default Catalog
