 import { useState } from 'react'
import { Link } from 'react-router-dom'
import './productCard.css'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image?: string
  badge?: string
  isNew?: boolean
  isHit?: boolean
}

const ProductCard = ({ id, name, price, image, badge, isNew, isHit }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="card-header">
          {isHit && <div className="product-badge hit">Хит</div>}
          {isNew && !isHit && <div className="product-badge new">Новинка</div>}
          {badge && !isHit && !isNew && <div className="product-badge">{badge}</div>}
      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={toggleFavorite}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavorite ? '#ffffffff' : 'none'}
          stroke={isFavorite ? '#FF6B9D' : '#666'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      </div>
      <div
        className="product-image"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      ></div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{price.toLocaleString('ru-RU')} с.</p>
      </div>
    </Link>
  )
}

export default ProductCard