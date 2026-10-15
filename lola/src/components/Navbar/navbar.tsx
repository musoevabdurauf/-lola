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
            <img src="src/assets/heart.png" alt="heart" style={{ width: '25px', height: '25px' }} />
          </Link>
          <a href="tel:+992750545471" className="navbar-phone" style={{display: "flex", placeItems: "center"}}>
            <img src="src/assets/Call.png" alt="Call" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
            <h1  style={{fontSize: "22px", color: "white", backgroundColor: "rgba(22, 169, 62, 0.94)" , padding: "2px 14px" , borderRadius: "10px", textAlign: "center", marginLeft: "10px"}}>Заказать</h1>
            </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar