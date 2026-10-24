import { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="lll">
            <p id="pp">L</p>
            <h3>Lola</h3>
          </div>
        </Link>

        <ul id="mobile-menu" className={`navbar-nav${isMenuOpen ? ' open' : ''}`}>
          <li><Link to="/" className="navbar-link" onClick={closeMenu}>Главная</Link></li>
          <li><Link to="/catalog" className="navbar-link" onClick={closeMenu}>Каталог</Link></li>
          <li><Link to="/about" className="navbar-link" onClick={closeMenu}>О нас</Link></li>
          <li><Link to="/delivery" className="navbar-link" onClick={closeMenu}>Доставка</Link></li>
          <li><Link to="/admin" className="navbar-link admin-link" onClick={closeMenu}>Админ</Link></li>
          <li className="navbar-mobile-only">
            <Link to="/favorite" className="navbar-link" onClick={closeMenu}>Избранное</Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/favorite" className="navbar-icon" title="Избранное" aria-label="Избранное">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>

          <a href="tel:+992750545471" className="navbar-phone">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="navbar-order">Заказать</span>
          </a>

          <button
            type="button"
            className={`navbar-burger${isMenuOpen ? ' active' : ''}`}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
