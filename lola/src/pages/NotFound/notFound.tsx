import { Link } from 'react-router-dom'
import './notFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Страница не найдена</h2>
          <p className="error-description">
            К сожалению, страница, которую вы ищете, не существует или была перемещена.
          </p>
          <Link to="/" className="home-button">
            Вернуться на главную
          </Link>
        </div>
        <div className="not-found-decoration">
          <div className="flower flower-1">🌸</div>
          <div className="flower flower-2">🌹</div>
          <div className="flower flower-3">💐</div>
          <div className="flower flower-4">🌺</div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
