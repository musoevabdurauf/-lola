import { CameraIcon, FlowerIcon, GiftIcon, SparklesIcon, ZapIcon } from '../Icons/icons'
import type { ReactNode } from 'react'
import './aboutFeatures.css'

interface Feature {
  icon: ReactNode
  title: string
  description: string
}

const AboutFeatures = () => {
  const features: Feature[] = [
    {
      icon: <FlowerIcon size={38} />,
      title: 'Свои флористы',
      description: 'Каждый букет собирают наши флористы вручную, в нашей студии в Душанбе. Без подсохших цветов.'
    },
    {
      icon: <CameraIcon size={38} />,
      title: 'Фото перед отправкой',
      description: 'Перед курьером отправляем фото букета вам в WhatsApp. Не нравится — пересоберём бесплатно.'
    },
    {
      icon: <ZapIcon size={38} />,
      title: 'Быстрая доставка',
      description: 'Доставка по Душанбе за 2–3 часа. Заявка через WhatsApp — быстрое подтверждение.'
    },
    {
      icon: <GiftIcon size={38} />,
      title: 'Анонимная доставка',
      description: 'Хотите сделать сюрприз? Мы доставим цветы анонимно, чтобы сохранить момент тайны.'
    }
  ]

  return (
    <section className="about-section">
      <div className="section-header">
        <span className="section-badge">
          <SparklesIcon size={16} />
          Преимущества
        </span>
        <h2 className="section-title">Почему выбирают нас</h2>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="feature-icon-wrapper">
              <span className="feature-icon">{feature.icon}</span>
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutFeatures
