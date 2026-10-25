import { CameraIcon, GiftIcon, TruckIcon } from '../Icons/icons'
import './deliveryInfo.css'

const DeliveryInfo = () => {
  const deliveryItems = [
    {
      Icon: TruckIcon,
      title: 'Доставка 2–3 часа',
      description: 'По Душанбе, ежедневно с 9:00 до 21:00',
    },
    {
      Icon: CameraIcon,
      title: 'Фото до отправки',
      description: 'Пришлём фото букета в WhatsApp',
    },
    {
      Icon: GiftIcon,
      title: 'Анонимно',
      description: 'Сохраним сюрприз для получателя',
    },
  ]

  return (
    <div className="pd-benefits">
      {deliveryItems.map(({ Icon, title, description }) => (
        <div className="pd-benefit" key={title}>
          <span className="pd-benefit-icon"><Icon size={20} /></span>
          <div>
            <p className="pd-benefit-title">{title}</p>
            <p className="pd-benefit-desc">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeliveryInfo
