import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogHeader from '../../components/CatalogHeader/catalogHeader'
import CatalogFilters from '../../components/CatalogFilters/catalogFilters'
import CatalogGrid from '../../components/CatalogGrid/catalogGrid'
import ProductCardSkeleton from '../../components/ProductCardSkeleton/productCardSkeleton'
import { FlowerIcon, RotateCcwIcon } from '../../components/Icons/icons'
import Api from '../../services/Api'
import type { Product } from '../../types'
import './catalog.css'

const PAGE_SIZE = 12

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const category = searchParams.get('category') ?? 'all'
  const [sortBy, setSortBy] = useState('popular')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showHitOnly, setShowHitOnly] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)

  const filterKey = [category, sortBy, minPrice, maxPrice, showHitOnly, showNewOnly].join('|')
  const [pagination, setPagination] = useState({ key: filterKey, count: PAGE_SIZE })
  const visibleCount = pagination.key === filterKey ? pagination.count : PAGE_SIZE

  const sentinelRef = useRef<HTMLDivElement | null>(null)

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

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => !showHitOnly || product.isHit)
      .filter((product) => !showNewOnly || product.isNew)
      .filter((product) => {
        if (!minPrice && !maxPrice) return true
        if (minPrice && product.price < Number(minPrice)) return false
        if (maxPrice && product.price > Number(maxPrice)) return false
        return true
      })
      .sort((a, b) => {
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
  }, [products, category, showHitOnly, showNewOnly, minPrice, maxPrice, sortBy])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = filteredProducts.length > visibleCount

  useEffect(() => {
    const target = sentinelRef.current
    if (!target || !hasMore || loading) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return
        }
        setPagination((prev) => ({
          key: filterKey,
          count: (prev.key === filterKey ? prev.count : PAGE_SIZE) + PAGE_SIZE,
        }))
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [filterKey, hasMore, loading, visibleCount])

  const setCategory = (nextCategory: string) => {
    setPagination({ key: '', count: PAGE_SIZE })
    const nextParams = new URLSearchParams(searchParams)
    if (nextCategory === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', nextCategory)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const resetFilters = () => {
    setPagination({ key: '', count: PAGE_SIZE })
    setCategory('all')
    setSortBy('popular')
    setMinPrice('')
    setMaxPrice('')
    setShowHitOnly(false)
    setShowNewOnly(false)
  }

  const changeSort = (value: string) => {
    setPagination({ key: '', count: PAGE_SIZE })
    setSortBy(value)
  }

  const changeMinPrice = (value: string) => {
    setPagination({ key: '', count: PAGE_SIZE })
    setMinPrice(value)
  }

  const changeMaxPrice = (value: string) => {
    setPagination({ key: '', count: PAGE_SIZE })
    setMaxPrice(value)
  }

  const toggleHits = (value: boolean) => {
    setPagination({ key: '', count: PAGE_SIZE })
    setShowHitOnly(value)
  }

  const toggleNew = (value: boolean) => {
    setPagination({ key: '', count: PAGE_SIZE })
    setShowNewOnly(value)
  }

  if (loading) {
    return (
      <div className="catalog">
        <CatalogHeader />
        <div className="catalog-container">
          <div className="catalog-filters-skeleton" aria-hidden="true">
            <div className="skeleton-block skeleton-filter-heading" />
            <div className="skeleton-filter-chips">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="skeleton-block skeleton-filter-chip" key={index} />
              ))}
            </div>
            <div className="skeleton-filter-row">
              <div className="skeleton-block skeleton-filter-control" />
              <div className="skeleton-block skeleton-filter-control" />
              <div className="skeleton-block skeleton-filter-control skeleton-filter-control-wide" />
            </div>
          </div>
          <div className="catalog-content">
            <div className="products-grid">
              <ProductCardSkeleton count={12} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="catalog">
      <CatalogHeader />
      <div className="catalog-container">
        <CatalogFilters
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={changeSort}
          minPrice={minPrice}
          setMinPrice={changeMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={changeMaxPrice}
          showHitOnly={showHitOnly}
          setShowHitOnly={toggleHits}
          showNewOnly={showNewOnly}
          setShowNewOnly={toggleNew}
          onReset={resetFilters}
          resultCount={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <div className="catalog-empty">
            <span className="catalog-empty-icon"><FlowerIcon size={42} /></span>
            <h2>Ничего не нашлось</h2>
            <p>Попробуйте изменить категорию или ценовой диапазон — у нас точно есть что-то красивое.</p>
            <button type="button" className="catalog-empty-button" onClick={resetFilters}>
              <RotateCcwIcon size={16} />
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <>
            <CatalogGrid products={visibleProducts} />

            {hasMore && (
              <div className="catalog-sentinel" ref={sentinelRef}>
                <span className="catalog-spinner" aria-hidden="true" />
                <span>Загружаем ещё букеты…</span>
              </div>
            )}

            {!hasMore && filteredProducts.length > PAGE_SIZE && (
              <p className="catalog-end">
                Вы посмотрели все {filteredProducts.length} товаров
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Catalog
