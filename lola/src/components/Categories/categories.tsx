import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriesApi } from '../../services/CategoriesApi'
import './categories.css'

interface Category {
  id: number
  name: string
  path: string
  count: string
  image: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-header">
            <span className="categories-badge">Категории</span>
            <h2 className="categories-title">Что ищете сегодня?</h2>
            <p className="categories-subtitle">Выберите идеальный букет для любого случая</p>
          </div>
          <div className="categories-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="category-card skeleton"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <span className="categories-badge">Категории</span>
          <h2 className="categories-title">Что ищете сегодня?</h2>
          <p className="categories-subtitle">Выберите идеальный букет для любого случая</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="category-card"
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