import './orderSection.css'

interface OrderSectionProps {
  totalPrice: string
}

const OrderSection = ({ totalPrice }: OrderSectionProps) => {
  return (
    <div className="order-wrapper">
      <div className="total-price">
        <span className="total-label">Итого:</span>
        <span className="total-amount">{totalPrice} с.</span>
      </div>
      <a href="tel:+992750545471" className="order-btn">
        <span className="order-icon">📞</span>
        Заказать
      </a>
    </div>
  )
}

export default OrderSection
