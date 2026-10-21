import { Link } from 'react-router-dom'
import './categories.css'

interface Category {
  name: string
  path: string
  count: string
  image: string
}

const Categories = () => {
  const categories: Category[] = [
    { name: 'Букеты', path: '/catalog/bukety', count: '24 товара', image: 'https://lotuss.tj/api/files/categories/bukety.webp' },
    { name: 'Розы', path: '/catalog/rozy', count: '14 товаров', image: 'https://lotuss.tj/api/files/categories/rozy.webp' },
    { name: 'Тюльпаны', path: '/catalog/tulpany', count: '1 товар', image: 'https://lotuss.tj/api/files/categories/tulpany.webp' },
    { name: 'Композиции', path: '/catalog/kompozitsii', count: '4 товара', image: 'https://lotuss.tj/api/files/categories/kompozitsii.webp' },
    { name: 'Корзины', path: '/catalog/korziny', count: '8 товаров', image: 'https://lotuss.tj/api/files/categories/korziny.webp' },
    { name: 'Свадебные', path: '/catalog/svadebnye', count: '6 товаров', image: 'https://lotuss.tj/api/files/categories/svadebnye.webp' }
  ]

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <span className="categories-badge">Категории</span>
          <h2 className="categories-title">Что ищете сегодня?</h2>
          <p className="categories-subtitle">Выберите идеальный букет для любого случая</p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} className="category-image" />
              </div>
              <h3 className="category-name">{category.name}</h3>
              <span className="category-count">{category.count}</span>
              <div className="category-arrow">→</div>
            </Link>
          ))}
        </div>

        <Link to="/catalog" className="categories-view-all">
          <span>Все категории</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default Categories