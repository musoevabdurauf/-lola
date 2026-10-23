import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoriesApi } from '../../services/CategoriesApi'
import AdminNavbar from '../Admin/components/AdminNavbar/adminNavbar'
import './adminCategories.css'

interface Category {
  id: number
  name: string
  path: string
  count?: string
  image: string
}

const AdminCategories = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/login')
      return
    }

    fetchCategories()
  }, [navigate])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoriesApi.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }

  const handleCreate = () => {
    setEditingCategory({ id: 0, name: '', path: '', image: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту категорию?')) return
    try {
      await categoriesApi.deleteCategory(id)
      await fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleSave = async (category: Category) => {
    try {
      if (category.id === 0) {
        await categoriesApi.createCategory(category)
      } else {
        await categoriesApi.updateCategory(category.id, category)
      }
      setIsModalOpen(false)
      await fetchCategories()
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  if (loading) {
    return (
      <div className="admin">
        <AdminNavbar onLogout={handleLogout} />
        <div className="admin-content">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-table"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <AdminNavbar onLogout={handleLogout} />
      <div className="admin-content">
        <div className="admin-categories">
          <div className="admin-header">
            <h1>Управление категориями</h1>
            <button className="btn btn-primary" onClick={handleCreate}>
              + Добавить категорию
            </button>
          </div>

          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <img src={category.image} alt={category.name} className="category-preview" />
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>Путь: {category.path}</p>
                  <p>Количество: {category.count || '0 товаров'}</p>
                </div>
                <div className="category-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(category)}>
                    Редактировать
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(category.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && editingCategory && (
        <CategoryModal
          category={editingCategory}
          isNew={editingCategory.id === 0}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

interface CategoryModalProps {
  category: Category
  isNew: boolean
  onSave: (category: Category) => void
  onClose: () => void
}

const CategoryModal = ({ category, isNew, onSave, onClose }: CategoryModalProps) => {
  const [formData, setFormData] = useState({ name: category.name, path: category.path, image: category.image })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...category, ...formData })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isNew ? 'Новая категория' : 'Редактировать категорию'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Путь:</label>
            <input
              type="text"
              value={formData.path}
              onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Изображение (URL):</label>
            <textarea
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div className="form-group">
            <p style={{ fontSize: '12px', color: '#666' }}>
              * Количество товаров будет рассчитано автоматически на основе продуктов в этой категории
            </p>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminCategories
