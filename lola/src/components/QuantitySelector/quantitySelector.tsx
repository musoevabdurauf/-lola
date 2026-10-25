import { MinusIcon, PlusIcon } from '../Icons/icons'
import './quantitySelector.css'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (delta: number) => void
  max?: number
}

const QuantitySelector = ({ quantity, onQuantityChange, max }: QuantitySelectorProps) => {
  const maxReached = max !== undefined && quantity >= max

  return (
    <div className="pd-quantity">
      <span className="pd-quantity-label">Количество</span>
      <div className="pd-quantity-control">
        <button
          type="button"
          className="pd-quantity-btn"
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1}
          aria-label="Уменьшить количество"
        >
          <MinusIcon size={18} />
        </button>
        <span className="pd-quantity-value">{quantity}</span>
        <button
          type="button"
          className="pd-quantity-btn"
          onClick={() => onQuantityChange(1)}
          disabled={maxReached}
          aria-label="Увеличить количество"
        >
          <PlusIcon size={18} />
        </button>
      </div>
      {max !== undefined && max > 0 && (
        <span className="pd-quantity-hint">Максимум {max} шт. в наличии</span>
      )}
    </div>
  )
}

export default QuantitySelector
