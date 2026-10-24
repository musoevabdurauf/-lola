import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogHeader from '../../components/CatalogHeader/catalogHeader'
import CatalogFilters from '../../components/CatalogFilters/catalogFilters'
import CatalogGrid from '../../components/CatalogGrid/catalogGrid'
import Api from '../../services/Api'
import type { Product } from '../../types'
import './catalog.css'

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = searchParams.get('category') ?? 'all'
  const [sortBy, setSortBy] = useState('popular')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [visibleCount, setVisibleCount] = useState(20)
  const [showHitOnly, setShowHitOnly] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)

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

  const setCategory = (nextCategory: string) => {
    setVisibleCount(20)
    const nextParams = new URLSearchParams(searchParams)
    if (nextCategory === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', nextCategory)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const filteredProducts = products.filter(product => {
    if (category === 'all') return true
    return product.category === category
  }).filter(product => {
    if (showHitOnly && !product.isHit) return false
    if (showNewOnly && !product.isNew) return false
    return true
  }).filter(product => {
    if (!minPrice && !maxPrice) return true
    const price = product.price
    if (minPrice && price < Number(minPrice)) return false
    if (maxPrice && price > Number(maxPrice)) return false
    return true
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

  const visibleProducts = sortedProducts.slice(0, visibleCount)
  const hasMore = sortedProducts.length > visibleCount

  const loadMore = () => {
    setVisibleCount(prev => prev + 20)
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
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onApplyPriceFilter={() => {}}
          showHitOnly={showHitOnly}
          setShowHitOnly={setShowHitOnly}
          showNewOnly={showNewOnly}
          setShowNewOnly={setShowNewOnly}
        />
        <CatalogGrid products={visibleProducts} />
        {hasMore && (
          <button className="load-more-btn" onClick={loadMore}>
            Показать еще
          </button>
        )}
      </div>
    </div>
  )
}

export default Catalog
