import { Link, NavLink } from 'react-router-dom'

const AdminNavbar = ({ onLogout }: { onLogout: () => void }) => {
  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `admin-navbar-menu-item${isActive ? ' active' : ''}`

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo">
          <Link to="/admin">
            🌸 Lola Admin
          </Link>
        </div>
        <div className="admin-navbar-menu">
          <NavLink to="/admin" end className={menuClass}>
            📦 Продукты
          </NavLink>
          <NavLink to="/admin/slides" className={menuClass}>
            🖼️ Слайды
          </NavLink>
          <NavLink to="/admin/categories" className={menuClass}>
            📁 Категории
          </NavLink>
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
