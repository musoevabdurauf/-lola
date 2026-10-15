import './productDetails.css'

interface ProductDetailsProps {
  composition: string
  height: string
  care: string
}

const ProductDetails = ({ composition, height, care }: ProductDetailsProps) => {
  return (
    <div className="product-details">
      <div className="detail-item">
        <span className="detail-label">🌸 Состав:</span>
        <span className="detail-value">{composition}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">📏 Высота:</span>
        <span className="detail-value">{height}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">💧 Уход:</span>
        <span className="detail-value">{care}</span>
      </div>
    </div>
  )
}

export default ProductDetails
