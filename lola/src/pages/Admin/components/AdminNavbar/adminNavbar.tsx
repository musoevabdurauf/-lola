import { Link } from 'react-router-dom'

const AdminNavbar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo">
          <Link to="/admin">
            🌸 Lola Admin
          </Link>
        </div>
        <div className="admin-navbar-menu">
          <Link to="/admin" className="admin-navbar-menu-item active">
            📦 Продукты
          </Link>
          <Link to="/admin/orders" className="admin-navbar-menu-item">
            📋 Заказы
          </Link>
          <Link to="/admin/settings" className="admin-navbar-menu-item">
            ⚙️ Настройки
          </Link>
        </div>
        <div className="admin-navbar-actions">
          <Link to="/" className="admin-navbar-link">
            🏠 На сайт
          </Link>
          <button className="admin-navbar-logout" onClick={onLogout}>
            🚪 Выйти
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
