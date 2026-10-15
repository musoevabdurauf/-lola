import './productImage.css'

interface ProductImageProps {
  image?: string
  badge?: string
  isNew?: boolean
  isHit?: boolean
}

const ProductImage = ({ image, badge, isNew, isHit }: ProductImageProps) => {
  return (
    <div className="product-image-container">
      {badge && (
        <div className={`product-badge ${isHit ? 'hit' : ''} ${isNew ? 'new' : ''}`}>{badge}</div>
      )}
      <div 
        className="product-image"
        style={image ? { backgroundImage: `url(${image})` } : { background: 'linear-gradient(135deg, #FF6B9D, #C44569)' }}
      ></div>
    </div>
  )
}

export default ProductImage
