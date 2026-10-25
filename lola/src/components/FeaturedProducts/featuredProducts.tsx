import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/productcard'
import ProductCardSkeleton from '../ProductCardSkeleton/productCardSkeleton'
import { ArrowRightIcon } from '../Icons/icons'
import type { Product } from '../../types'
import './featuredProducts.css'

interface FeaturedProductsProps {
  products: Product[]
  loading?: boolean
}

const FeaturedProducts = ({ products, loading = false }: FeaturedProductsProps) => {
  const [visibleCount, setVisibleCount] = useState(8)
  const visibleProducts = products.slice(0, visibleCount)
  const hasMore = products.length > visibleCount

  const loadMore = () => {
    setVisibleCount(prev => prev + 8)
  }

  return (
    <section className="featured-products">
      <div className="featured-container">
        <div className="featured-header">
          <div className="featured-title-wrapper">
            <span className="featured-badge">Популярное</span>
            <h2 className="featured-title">Что заказывают чаще всего</h2>
            <p className="featured-subtitle">Самые любимые букеты наших клиентов</p>
          </div>
          <Link to="/catalog" className="featured-view-all">
            <span>Смотреть все</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>

        <div className="featured-products-grid">
          {loading
            ? <ProductCardSkeleton count={8} />
            : visibleProducts.map((product, index) => {
              const batchIndex = index % 8
              return (
                <div key={product.id} className="product-wrapper" style={{ animationDelay: `${batchIndex * 0.05}s` }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    badge={product.badge}
                    isNew={product.isNew}
                    isHit={product.isHit}
                    image={product.image}
                    stock={product.stock}
                  />
                </div>
              )
            })}
        </div>

        {!loading && hasMore && (
          <div className="featured-load-more">
            <button className="load-more-btn" onClick={loadMore}>
              Показать еще
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
