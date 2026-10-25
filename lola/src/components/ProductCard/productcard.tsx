import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon } from '../Icons/icons'
import './productCard.css'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image?: string
  badge?: string
  isNew?: boolean
  isHit?: boolean
  stock?: number
}

const ProductCard = ({ id, name, price, image, badge, isNew, isHit, stock }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const stockLabel = stock === undefined
    ? 'Уточняйте наличие'
    : stock <= 0
      ? 'Нет в наличии'
      : stock <= 3
        ? `Осталось ${stock} шт.`
        : `В наличии ${stock} шт.`

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="card-header">
        {isHit && <div className="product-badge hit">Хит</div>}
        {isNew && !isHit && <div className="product-badge new">Новинка</div>}
        {badge && !isHit && !isNew && <div className="product-badge">{badge}</div>}
        <button
          type="button"
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <HeartIcon size={22} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div
        className="product-image"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      >
        {!image && <span className="product-image-placeholder">Lola</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-card-footer">
          <p className="product-price">{price.toLocaleString('ru-RU')} с.</p>
          <span className={`product-stock ${stock === undefined ? 'unknown' : stock <= 0 ? 'out' : stock <= 3 ? 'low' : 'in'}`}>
            <span className="stock-dot" />
            {stockLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
