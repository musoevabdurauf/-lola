import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import AdminNavbar from './components/AdminNavbar/adminNavbar'
import AdminHeader from './components/AdminHeader/adminHeader'
import AdminTable from './components/AdminTable/adminTable'
import AdminModal from './components/AdminModal/adminModal'
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
      <AdminNavbar onLogout={handleLogout} />
      <div className="admin-content">
        <AdminHeader onCreate={handleCreate} />
        <AdminTable
          products={products}
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
    </div>
  )
}

export default Admin
