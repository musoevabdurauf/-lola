import './about.css'

const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <h1 className="about-title">О нас</h1>
        <p className="about-subtitle">Букеты, которые радуют каждого</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2 className="section-title">Наша история</h2>
          <p className="about-text">
            Lola — это сервис доставки цветов в Душанбе, который создан для того, чтобы делать людей счастливее. 
            Мы начинали как небольшая студия флористики и выросли в одну из ведущих служб доставки цветов в городе.
          </p>
          <p className="about-text">
            Наша миссия — дарить эмоции через цветы. Каждый букет собирается вручную нашими профессиональными флористами 
            с любовью и вниманием к каждой детали.
          </p>
        </section>

        <section className="about-section">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌸</div>
              <h3 className="feature-title">Свои флористы</h3>
              <p className="feature-desc">Каждый букет собирают наши флористы вручную, в нашей студии в Душанбе. Без подсохших цветов.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3 className="feature-title">Фото перед отправкой</h3>
              <p className="feature-desc">Перед курьером отправляем фото букета вам в WhatsApp. Не нравится — пересоберём бесплатно.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Быстрая доставка</h3>
              <p className="feature-desc">Доставка по Душанбе за 2–3 часа. Заявка через WhatsApp — быстрое подтверждение.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💝</div>
              <h3 className="feature-title">Анонимная доставка</h3>
              <p className="feature-desc">Хотите сделать сюрприз? Мы доставим цветы анонимно, чтобы сохранить момент тайны.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">Наши принципы</h2>
          <div className="principles-list">
            <div className="principle-item">
              <span className="principle-number">01</span>
              <div className="principle-content">
                <h3 className="principle-title">Свежесть гарантирована</h3>
                <p className="principle-text">Мы работаем только со свежими цветами. Каждый букет проверяется перед отправкой.</p>
              </div>
            </div>
            <div className="principle-item">
              <span className="principle-number">02</span>
              <div className="principle-content">
                <h3 className="principle-title">Индивидуальный подход</h3>
                <p className="principle-text">Мы можем собрать букет по вашему описанию или фотографии.</p>
              </div>
            </div>
            <div className="principle-item">
              <span className="principle-number">03</span>
              <div className="principle-content">
                <h3 className="principle-title">Качество сервиса</h3>
                <p className="principle-text">Наши менеджеры всегда на связи и готовы помочь с выбором.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section contact-section">
          <h2 className="section-title">Свяжитесь с нами</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div className="contact-details">
                <p className="contact-label">Телефон</p>
                <a href="tel:+992750545471" className="contact-value">+992 750 545 471</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-details">
                <p className="contact-label">Адрес</p>
                <p className="contact-value">г. Душанбе</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⏰</span>
              <div className="contact-details">
                <p className="contact-label">Время работы</p>
                <p className="contact-value">Ежедневно 9:00 - 21:00</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
