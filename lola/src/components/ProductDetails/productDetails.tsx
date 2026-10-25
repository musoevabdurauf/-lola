import { DropletIcon, FlowerIcon, RulerIcon } from '../Icons/icons'
import './productDetails.css'

interface ProductDetailsProps {
  composition: string
  height: string
  care: string
}

const ProductDetails = ({ composition, height, care }: ProductDetailsProps) => {
  const details = [
    { label: 'Состав', value: composition, Icon: FlowerIcon },
    { label: 'Высота', value: height, Icon: RulerIcon },
    { label: 'Уход', value: care, Icon: DropletIcon },
  ]

  return (
    <div className="pd-specs">
      {details.map(({ label, value, Icon }) => (
        <div className="pd-spec" key={label}>
          <span className="pd-spec-icon"><Icon size={19} /></span>
          <div className="pd-spec-text">
            <span className="pd-spec-label">{label}</span>
            <span className="pd-spec-value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductDetails
