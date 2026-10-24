import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { clearAuthToken, isAuthenticated } from '../../services/http'
import type { Product } from '../../types'
import AdminNavbar from './components/AdminNavbar/adminNavbar'
import AdminHeader from './components/AdminHeader/adminHeader'
import AdminTable from './components/AdminTable/adminTable'
import AdminModal from './components/AdminModal/adminModal'
import AdminStats from './components/AdminStats/adminStats'
import './admin.css'

const Admin = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
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

  const refreshProducts = async () => {
    try {
      const data = await Api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    let cancelled = false

    const loadProducts = async () => {
      try {
        const data = await Api.getProducts()
        if (!cancelled) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [navigate])

  const handleLogout = () => {
    clearAuthToken()
    navigate('/login')
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

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
        showNotification('success', 'Продукт успешно обновлен')
      } else {
        await Api.createProduct(formData)
        showNotification('success', 'Продукт успешно создан')
      }
      await refreshProducts()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving product:', error)
      showNotification('error', 'Ошибка при сохранении продукта')
    }
  }

  const handleDelete = async (id: string) => {
    setProductToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await Api.deleteProduct(productToDelete)
        await refreshProducts()
        showNotification('success', 'Продукт успешно удален')
      } catch (error) {
        console.error('Error deleting product:', error)
        showNotification('error', 'Ошибка при удалении продукта')
      } finally {
        setIsDeleteModalOpen(false)
        setProductToDelete(null)
      }
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  if (loading) {
    return (
      <div className="admin">
        <AdminNavbar onLogout={handleLogout} />
        <div className="admin-content">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-stats"></div>
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
        <AdminHeader onCreate={handleCreate} />
        <AdminStats products={products} />
        <div className="admin-filters">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Поиск по названию или ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            <option value="bukety">Букеты</option>
            <option value="rozy">Розы</option>
            <option value="tulpany">Тюльпаны</option>
            <option value="kompozitsii">Композиции</option>
            <option value="korziny">Корзины</option>
            <option value="svadebnye">Свадебные</option>
          </select>
        </div>
        <AdminTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <AdminModal
        isOpen={isModalOpen}
        editingProduct={editingProduct}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' ? '✅' : '❌'} {notification.message}
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Подтверждение удаления</h2>
            <p className="delete-modal-text">Вы уверены, что хотите удалить этот продукт? Это действие нельзя отменить.</p>
            <div className="modal-actions">
              <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
                Отмена
              </button>
              <button type="button" className="btn-danger" onClick={confirmDelete}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
