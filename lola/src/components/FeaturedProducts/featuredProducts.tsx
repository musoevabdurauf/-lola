import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/productcard'
import './featuredProducts.css'

interface Product {
  id: string
  name: string
  price: number
  badge: string
  isNew: boolean
  isHit: boolean
  image?: string
}

interface FeaturedProductsProps {
  products: Product[]
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="featured-products-grid">
          {visibleProducts.map((product, index) => (
            <div key={product.id} className="product-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                badge={product.badge}
                isNew={product.isNew}
                isHit={product.isHit}
                image={product.image}
              />
            </div>
          ))}
        </div>

        {hasMore && (
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
