import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="src/assets/Lola.png" alt="Lola" style={{ width: '100px', height: '60px'}} />
        </Link>
        
        <ul className="navbar-nav">
          <li><Link to="/" className="navbar-link">Главная</Link></li>
          <li><Link to="/catalog" className="navbar-link">Каталог</Link></li>
          <li><Link to="/about" className="navbar-link">О нас</Link></li>
          <li><Link to="/delivery" className="navbar-link">Доставка</Link></li>
          <li><Link to="/admin" className="navbar-link admin-link">Админ</Link></li>
        </ul>

        <div className="navbar-actions" style={{display: "flex", placeContent: "center"}}>
          <Link to="/favorite" className="navbar-icon" title="Избранное" style={{display: "flex",  placeItems: "center"}}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>

          <a href="tel:+992750545471" className="navbar-phone" style={{display: "flex", placeItems: "center"}}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <h1  style={{fontSize: "22px", color: "white", backgroundColor: "rgba(22, 169, 62, 0.94)" , padding: "2px 14px" , borderRadius: "10px", textAlign: "center", marginLeft: "10px"}}>Заказать</h1>
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar