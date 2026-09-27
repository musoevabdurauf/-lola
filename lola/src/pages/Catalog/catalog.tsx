import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard/productcard'
import './catalog.css'

const Catalog = () => {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://localhost:5000/api/products'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'bukety', name: 'Букеты' },
    { id: 'rozy', name: 'Розы' },
    { id: 'tulpany', name: 'Тюльпаны' },
    { id: 'kompozitsii', name: 'Композиции' },
    { id: 'korziny', name: 'Корзины' },
    { id: 'svadebnye', name: 'Свадебные' },
  ]

  const sortOptions = [
    { id: 'popular', name: 'По популярности' },
    { id: 'price-asc', name: 'Сначала дешевле' },
    { id: 'price-desc', name: 'Сначала дороже' },
    { id: 'new', name: 'Сначала новинки' },
  ]

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true
    return product.category === selectedCategory
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
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог</h1>
        <p className="catalog-subtitle">Букеты, которые радуют каждого</p>
      </div>

      <div className="catalog-container">
        {/* Filters Sidebar */}
        <aside className="catalog-filters">
          <div className="filter-section">
            <h3 className="filter-title">Категории</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-option ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Сортировка</h3>
            <div className="filter-options">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  className={`filter-option ${sortBy === option.id ? 'active' : ''}`}
                  onClick={() => setSortBy(option.id)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Цена</h3>
            <div className="price-filter">
              <input type="number" placeholder="От" className="price-input" />
              <span className="price-separator">—</span>
              <input type="number" placeholder="До" className="price-input" />
            </div>
            <button className="apply-filter-btn">Применить</button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="catalog-content">
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                badge={product.badge}
                isNew={product.isNew}
                isHit={product.isHit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog
