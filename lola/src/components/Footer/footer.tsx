import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Lola</h3>
            <p className="footer-description">
              Доставка цветов по Душанбе за 2–3 часа. Заявка через WhatsApp — быстрое подтверждение.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Каталог</h3>
            <ul className="footer-links">
              <li><Link to="/catalog/bukety">Букеты</Link></li>
              <li><Link to="/catalog/rozy">Розы</Link></li>
              <li><Link to="/catalog/tulpany">Тюльпаны</Link></li>
              <li><Link to="/catalog/kompozitsii">Композиции</Link></li>
              <li><Link to="/catalog/korziny">Корзины</Link></li>
              <li><Link to="/catalog/svadebnye">Свадебные</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Информация</h3>
            <ul className="footer-links">
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/delivery">Доставка</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Контакты</h3>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+992750545471">+992 750 545 471</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>г. Душанбе</span>
              </li>
              <li>
                <span className="contact-icon">⏰</span>
                <span>Ежедневно 9:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright"> 2024 Lola. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer