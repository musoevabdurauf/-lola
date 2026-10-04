import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="src/assets/Lola.png" alt="Lola" style={{ width: '70px', height: '70px', borderRadius: "50%"}} />
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
            <img src="src/assets/heart.png" alt="heart" style={{ width: '30px', height: '30px' }} />
          </Link>
          <a href="tel:+992750545471" className="navbar-phone" style={{display: "flex", placeItems: "center"}}>
            <img src="src/assets/Call.png" alt="Call" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            <h1 style={{fontSize: "25px"}}>Заказать</h1>
            </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar