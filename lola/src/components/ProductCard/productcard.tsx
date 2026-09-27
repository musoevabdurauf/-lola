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
  return (
    <Link to={`/product/${id}`} className="product-card">
      {badge && <div className={`product-badge ${isNew ? 'new' : ''} ${isHit ? 'hit' : ''}`}>{badge}</div>}
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