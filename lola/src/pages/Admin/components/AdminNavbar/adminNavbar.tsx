import { Link, NavLink } from 'react-router-dom'
import {
  ClipboardListIcon,
  FlowerIcon,
  FolderIcon,
  HomeIcon,
  ImagesIcon,
  LogOutIcon,
  PackageIcon,
} from '../../../../components/Icons/icons'

const AdminNavbar = ({ onLogout }: { onLogout: () => void }) => {
  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `admin-navbar-menu-item${isActive ? ' active' : ''}`

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo">
          <Link to="/admin">
            <FlowerIcon size={24} />
            Lola Admin
          </Link>
        </div>
        <div className="admin-navbar-menu">
          <NavLink to="/admin" end className={menuClass}>
            <PackageIcon size={18} />
            Продукты
          </NavLink>
          <NavLink to="/admin/orders" className={menuClass}>
            <ClipboardListIcon size={18} />
            Заказы
          </NavLink>
          <NavLink to="/admin/slides" className={menuClass}>
            <ImagesIcon size={18} />
            Слайды
          </NavLink>
          <NavLink to="/admin/categories" className={menuClass}>
            <FolderIcon size={18} />
            Категории
          </NavLink>
        </div>
        <div className="admin-navbar-actions">
          <Link to="/" className="admin-navbar-link">
            <HomeIcon size={17} />
            На сайт
          </Link>
          <button className="admin-navbar-logout" onClick={onLogout}>
            <LogOutIcon size={17} />
            Выйти
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
