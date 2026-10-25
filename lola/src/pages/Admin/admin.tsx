import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { categoriesApi } from '../../services/CategoriesApi'
import { clearAuthToken, isAuthenticated } from '../../services/http'
import { AlertCircleIcon, CheckCircleIcon, SearchIcon } from '../../components/Icons/icons'
import type { Category, Product } from '../../types'
import AdminNavbar from './components/AdminNavbar/adminNavbar'
import AdminHeader from './components/AdminHeader/adminHeader'
import AdminTable from './components/AdminTable/adminTable'
import AdminModal from './components/AdminModal/adminModal'
import AdminStats from './components/AdminStats/adminStats'
import './admin.css'

const emptyForm: Partial<Product> = {
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
  image: '',
  stock: 0,
}

const Admin = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>(emptyForm)

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

    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          Api.getProducts(),
          categoriesApi.getCategories(),
        ])
        if (!cancelled) {
          setProducts(productsData)
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

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
    setFormData(emptyForm)
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
    const isNumericField = name === 'price' || name === 'stock'
    const nextValue = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : isNumericField
        ? Number(value)
        : value

    setFormData((prev) => ({ ...prev, [name]: nextValue }) as Partial<Product>)
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
          <div className="search-wrapper">
            <SearchIcon size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Поиск по названию или ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            {categories.map((category) => {
              const slug = category.path.split('/').pop() ?? String(category.id)
              return (
                <option key={category.id} value={slug}>{category.name}</option>
              )
            })}
          </select>
        </div>
        <AdminTable
          products={filteredProducts}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <AdminModal
        isOpen={isModalOpen}
        editingProduct={editingProduct}
        formData={formData}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success'
            ? <CheckCircleIcon size={18} />
            : <AlertCircleIcon size={18} />}
          {notification.message}
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
