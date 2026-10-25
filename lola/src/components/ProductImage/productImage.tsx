import { FlowerIcon } from '../Icons/icons'
import './productImage.css'

interface ProductImageProps {
  image?: string
  badge?: string
  isNew?: boolean
  isHit?: boolean
  name: string
}

const ProductImage = ({ image, badge, isNew, isHit, name }: ProductImageProps) => {
  return (
    <div className="pd-gallery">
      {badge && (
        <div className={`pd-gallery-badge ${isHit ? 'hit' : ''} ${isNew ? 'new' : ''}`}>
          {badge}
        </div>
      )}
      {image ? (
        <img src={image} alt={name} className="pd-gallery-img" />
      ) : (
        <div className="pd-gallery-placeholder">
          <FlowerIcon size={56} />
          <span>Lola</span>
        </div>
      )}
      <div className="pd-gallery-caption">
        <FlowerIcon size={16} />
        Свежий букет из нашей студии в Душанбе
      </div>
    </div>
  )
}

export default ProductImage
