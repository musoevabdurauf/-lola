import { HeartIcon } from '../Icons/icons'
import { Link } from 'react-router-dom'
import './emptyState.css'

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <HeartIcon />
      </div>
      <h2 className="empty-title">У вас пока нет избранных букетов</h2>
      <p className="empty-description">
        Добавьте букеты в избранное, чтобы не потерять их
      </p>
      <Link to="/catalog" className="empty-button">Перейти в каталог</Link>
    </div>
  )
}

export default EmptyState
