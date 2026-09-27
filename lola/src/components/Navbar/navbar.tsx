import { Link } from 'react-router-dom'
import { useState } from 'react'
import './navbar.css'

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🌸 Lola
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/" className="navbar-link">Главная</Link></li>
          <li 
            className="navbar-dropdown"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <Link to="/catalog" className="navbar-link">Каталог</Link>
            {isCategoriesOpen && (
              <div className="dropdown-menu">
                <Link to="/catalog/bukety" className="dropdown-item">Букеты</Link>
                <Link to="/catalog/rozy" className="dropdown-item">Розы</Link>
                <Link to="/catalog/tulpany" className="dropdown-item">Тюльпаны</Link>
                <Link to="/catalog/kompozitsii" className="dropdown-item">Композиции</Link>
                <Link to="/catalog/korziny" className="dropdown-item">Корзины</Link>
                <Link to="/catalog/svadebnye" className="dropdown-item">Свадебные</Link>
                <Link to="/catalog/dekorativnye-rasteniya" className="dropdown-item">Декоративные растения</Link>
              </div>
            )}
          </li>
          <li><Link to="/about" className="navbar-link">О нас</Link></li>
          <li><Link to="/delivery" className="navbar-link">Доставка</Link></li>
          <li><Link to="/admin" className="navbar-link admin-link">Админ</Link></li>
        </ul>

        <div className="navbar-actions">
          <Link to="/favorite" className="navbar-icon" title="Избранное">❤️</Link>
          <Link to="/cart" className="navbar-icon" title="Корзина">🛒</Link>
          <a href="tel:+992750545471" className="navbar-phone">+992 750 545 471</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar