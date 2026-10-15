import './productInfo.css'

interface ProductInfoProps {
  name: string
  price: number
  badge?: string
  isNew?: boolean
  isHit?: boolean
  description: string
}

const ProductInfo = ({ name, price, badge, isNew, isHit, description }: ProductInfoProps) => {
  return (
    <div className="product-info-container">
      <div className="product-header">
        <h1 className="product-title">{name}</h1>
        <div className="product-meta">
          {badge && (
            <span className={`product-meta-badge ${isNew ? 'new' : ''} ${isHit ? 'hit' : ''}`}>{badge}</span>
          )}
        </div>
      </div>
      <p className="product-price">{price.toLocaleString('ru-RU')} с.</p>
      
      <div className="product-description">
        <h3 className="info-title">Описание</h3>
        <p className="description-text">{description}</p>
      </div>
    </div>
  )
}

export default ProductInfo
