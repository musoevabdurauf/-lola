import './quantitySelector.css'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (delta: number) => void
}

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  return (
    <div className="quantity-wrapper">
      <span className="quantity-label">Количество:</span>
      <div className="quantity-selector">
        <button 
          className="quantity-btn"
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          −
        </button>
        <span className="quantity-value">{quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => onQuantityChange(1)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector
