import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import './admin.css'

interface Product {
  id: string
  name: string
  price: number
  description: string
  badge: string
  isNew: boolean
  isHit: boolean
  category: string
  composition: string
  height: string
  care: string
  image?: string
}

const Admin = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    badge: '',
    isNew: false,
    isHit: false,
    category: 'bukety',
    composition: '',
    height: '',
    care: '',
    image: ''
  })

  useEffect(() => {
    // Проверка авторизации
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      navigate('/login')
      return
    }

    fetchProducts()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await Api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      badge: '',
      isNew: false,
      isHit: false,
      category: 'bukety',
      composition: '',
      height: '',
      care: '',
      image: ''
    })
    setEditingProduct(null)
  }

  const handleCreate = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingProduct) {
        await Api.updateProduct(editingProduct.id, formData)
      } else {
        await Api.createProduct(formData)
      }
      await fetchProducts()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        await Api.deleteProduct(id)
        await fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  if (loading) {
    return <div className="admin">Загрузка...</div>
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1 className="admin-title">Админ панель</h1>
        <div className="admin-header-actions">
          <button className="admin-button" onClick={handleCreate}>
            + Добавить продукт
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Выйти
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Цена</th>
              <th>Категория</th>
              <th>Бейдж</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price} с.</td>
                <td>{product.category}</td>
                <td>{product.badge}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(product)}>
                    ✏️
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(product.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingProduct ? 'Редактировать продукт' : 'Добавить продукт'}
            </h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Цена</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Категория</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="bukety">Букеты</option>
                  <option value="rozy">Розы</option>
                  <option value="tulpany">Тюльпаны</option>
                  <option value="kompozitsii">Композиции</option>
                  <option value="korziny">Корзины</option>
                  <option value="svadebnye">Свадебные</option>
                </select>
              </div>
              <div className="form-group">
                <label>Бейдж</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleInputChange}
                  />
                  Новинка
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isHit"
                    checked={formData.isHit}
                    onChange={handleInputChange}
                  />
                  Хит продаж
                </label>
              </div>
              <div className="form-group">
                <label>Состав</label>
                <input
                  type="text"
                  name="composition"
                  value={formData.composition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Высота</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Уход</label>
                <input
                  type="text"
                  name="care"
                  value={formData.care}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Ссылка на изображение (URL)</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Вставьте ссылку на изображение (рекомендуются легкие изображения)
                </small>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit">
                  {editingProduct ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
