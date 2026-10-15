import { Link } from 'react-router-dom'
import './helpSection.css'

const HelpSection = () => {
  return (
    <section className="help-section">
      <div className="help-container">
        <div className="help-header">
          <span className="help-badge">❓ Нужна помощь?</span>
          <h2 className="help-title">Не знаете, что выбрать?</h2>
          <p className="help-subtitle">Мы поможем вам найти идеальный букет</p>
        </div>

        <div className="help-links">
          <Link to="/about" className="help-link">
            <span className="help-icon">📖</span>
            <div className="help-content">
              <h3 className="help-link-title">Покупателям</h3>
              <p className="help-link-desc">Информация о заказе и доставке</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>

          <Link to="/catalog" className="help-link">
            <span className="help-icon">🌸</span>
            <div className="help-content">
              <h3 className="help-link-title">Каталог</h3>
              <p className="help-link-desc">Все наши букеты и композиции</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>

          <Link to="/contact" className="help-link">
            <span className="help-icon">📞</span>
            <div className="help-content">
              <h3 className="help-link-title">Контакты</h3>
              <p className="help-link-desc">Свяжитесь с нами напрямую</p>
            </div>
            <span className="help-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HelpSection
