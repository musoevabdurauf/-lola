import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriesApi } from '../../services/CategoriesApi'
import { ArrowRightIcon, ChevronDownIcon } from '../Icons/icons'
import type { Category } from '../../types'
import './categories.css'

const getCategorySlug = (path: string) => {
  return path.split('/').pop()
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadCategories = async () => {
      try {
        const data = await categoriesApi.getCategories()
        if (!cancelled) {
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

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
          {(showAll ? categories : categories.slice(0, 10)).map((category) => (
            <Link
              key={category.id}
              to={`/catalog?category=${getCategorySlug(category.path)}`}
              className="category-card"
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} className="category-image" />
              </div>
              <h3 className="category-name">{category.name}</h3>
              <span className="category-count">{category.count}</span>
              <div className="category-arrow"><ArrowRightIcon size={22} /></div>
            </Link>
          ))}
        </div>

        {categories.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="categories-view-all"
          >
            <span>{showAll ? 'Свернуть' : 'Все категории'}</span>
            <ChevronDownIcon
              size={20}
              style={{ transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            />
          </button>
        )}
      </div>
    </section>
  )
}

export default Categories