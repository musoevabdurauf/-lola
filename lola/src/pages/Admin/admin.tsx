import { useState, useEffect } from 'react'
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
  const [products, setProducts] = useState<Product[]>([])
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

  const API_URL = 'http://localhost:5000/api/products'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCreate = () => {
    setEditingProduct(null)
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
      care: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот продукт?')) return

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingProduct) {
        await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      fetchProducts()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1 className="admin-title">Админ панель</h1>
        <button className="admin-button" onClick={handleCreate}>
          + Добавить продукт
        </button>
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
