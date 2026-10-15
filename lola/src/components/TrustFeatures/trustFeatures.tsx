import './trustFeatures.css'

interface TrustFeature {
  title: string
  description: string
  icon: string
}

const TrustFeatures = () => {
  const features: TrustFeature[] = [
    { 
      title: 'Свои флористы', 
      description: 'Каждый букет собирают наши флористы вручную, в нашей студии в Душанбе. Без подсохших цветов.',
      icon: '👩‍🎨'
    },
    { 
      title: 'Фото перед отправкой', 
      description: 'Перед курьером отправляем фото букета вам в WhatsApp. Не нравится — пересоберём бесплатно, доставим вовремя.',
      icon: '📸'
    },
    { 
      title: 'Быстрая заявка', 
      description: 'После заявки менеджер свяжется в WhatsApp и подтвердит состав букета, адрес и удобный способ получения.',
      icon: '⚡'
    }
  ]

  return (
    <section className="trust-section">
      <div className="trust-container">
        <div className="trust-header">
          <span className="trust-badge">✨ Преимущества</span>
          <h2 className="trust-title">Большие обещания — короткие сроки</h2>
          <p className="trust-subtitle">Почему выбирают именно нас</p>
        </div>

        <div className="trust-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="trust-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="trust-icon-wrapper">
                <span className="trust-icon">{feature.icon}</span>
              </div>
              <h3 className="trust-title">{feature.title}</h3>
              <p className="trust-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustFeatures
