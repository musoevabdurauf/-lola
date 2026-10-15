import './deliveryInfo.css'

interface DeliveryItem {
  icon: string
  title: string
  description: string
}

const DeliveryInfo = () => {
  const deliveryItems: DeliveryItem[] = [
    {
      icon: '🚚',
      title: 'Быстрая доставка',
      description: 'Доставка по Душанбе за 2–3 часа'
    },
    {
      icon: '📸',
      title: 'Фото перед отправкой',
      description: 'Отправим фото букета в WhatsApp'
    },
    {
      icon: '💝',
      title: 'Анонимная доставка',
      description: 'Сделаем сюрприз получателю'
    }
  ]

  return (
    <div className="delivery-info">
      {deliveryItems.map((item, index) => (
        <div key={index} className="delivery-item">
          <span className="delivery-icon">{item.icon}</span>
          <div className="delivery-text">
            <p className="delivery-title">{item.title}</p>
            <p className="delivery-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeliveryInfo
