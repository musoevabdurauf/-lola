import { Link } from 'react-router-dom'
import './helpSection.css'

const HelpSection = () => {
  return (
    <section className="help-section">
      <div className="help-container">
        <div className="help-header">
          <span className="help-badge">Нужна помощь?</span>
          <h2 className="help-title">Не знаете, что выбрать?</h2>
          <p className="help-subtitle">Мы поможем вам найти идеальный букет</p>
        </div>

        <div className="help-links">
          <Link to="/about" className="help-link">
            <span className="help-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </span>
            <div className="help-content">
              <h3 className="help-link-title">Покупателям</h3>
              <p className="help-link-desc">Информация о заказе и доставке</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>

          <Link to="/catalog" className="help-link">
            <span className="help-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </span>
            <div className="help-content">
              <h3 className="help-link-title">Каталог</h3>
              <p className="help-link-desc">Все наши букеты и композиции</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>

          <Link to="/contact" className="help-link">
            <span className="help-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
            <div className="help-content">
              <h3 className="help-link-title">Контакты</h3>
              <p className="help-link-desc">Свяжитесь с нами напрямую</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>
        </div>

        <div className="help-map">
          <div className="map-container">
            <div className="map-address">
              <span className="map-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <span className="address-text">HQ7X+F2C, M41, Душанбе, Таджикистан</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d300.1662152667649!2d68.79765693472348!3d38.563335140027434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2s!4v1792852316181!5m2!1sru!2s"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpSection
