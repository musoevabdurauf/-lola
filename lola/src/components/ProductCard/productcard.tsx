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
      {badge && <div className={`product-badge ${isNew ? 'new' : ''} ${isHit ? 'hit' : ''}`}>{badge}</div>}
      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={toggleFavorite}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavorite ? '#ffc6d9ff' : 'none'}
          stroke={isFavorite ? '#FF6B9D' : '#666'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <div
        className="product-image"
        style={image ? { backgroundImage: `url(${image})` } : { background: 'linear-gradient(135deg, #FF6B9D, #C44569)' }}
      ></div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{price.toLocaleString('ru-RU')} с.</p>
      </div>
    </Link>
  )
}

export default ProductCard