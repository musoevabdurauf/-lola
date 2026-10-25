import { FlameIcon, SparklesIcon } from '../Icons/icons'
import './productInfo.css'

interface ProductInfoProps {
  name: string
  price: number
  badge?: string
  isNew?: boolean
  isHit?: boolean
  description: string
  stock?: number
}

const ProductInfo = ({ name, price, isNew, isHit, description, stock }: ProductInfoProps) => {
  const stockClass = stock === undefined ? 'unknown' : stock <= 0 ? 'out' : stock <= 3 ? 'low' : 'in'
  const stockText = stock === undefined
    ? 'Уточняйте наличие'
    : stock <= 0
      ? 'Нет в наличии'
      : stock <= 3
        ? `Осталось ${stock} шт.`
        : `В наличии ${stock} шт.`

  return (
    <div className="pd-summary">
      <div className="pd-tags">
        {isHit && (
          <span className="pd-tag pd-tag-hit">
            <FlameIcon size={14} />
            Хит продаж
          </span>
        )}
        {isNew && (
          <span className="pd-tag pd-tag-new">
            <SparklesIcon size={14} />
            Новинка
          </span>
        )}
        <span className={`pd-stock ${stockClass}`}>
          <span className="pd-stock-dot" />
          {stockText}
        </span>
      </div>

      <h1 className="pd-title">{name}</h1>

      <div className="pd-price-row">
        <span className="pd-price">{price.toLocaleString('ru-RU')} с.</span>
        <span className="pd-price-unit">за букет</span>
      </div>

      <p className="pd-description">{description}</p>
    </div>
  )
}

export default ProductInfo
