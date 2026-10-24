import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { slidesApi } from '../../services/SlidesApi'
import { clearAuthToken, isAuthenticated } from '../../services/http'
import type { Slide } from '../../types'
import AdminNavbar from '../Admin/components/AdminNavbar/adminNavbar'
import './adminSlides.css'

const AdminSlides = () => {
  const navigate = useNavigate()
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const refreshSlides = async () => {
    try {
      const data = await slidesApi.getSlides()
      setSlides(data)
    } catch (error) {
      console.error('Error fetching slides:', error)
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    let cancelled = false

    const loadSlides = async () => {
      try {
        const data = await slidesApi.getSlides()
        if (!cancelled) {
          setSlides(data)
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSlides()

    return () => {
      cancelled = true
    }
  }, [navigate])

  const handleLogout = () => {
    clearAuthToken()
    navigate('/login')
  }

  const handleCreate = () => {
    setEditingSlide({ id: 0, image: '', title: '', description: '' })
    setIsModalOpen(true)
  }

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот слайд?')) return
    try {
      await slidesApi.deleteSlide(id)
      await refreshSlides()
    } catch (error) {
      console.error('Error deleting slide:', error)
    }
  }

  const handleSave = async (slide: Slide) => {
    try {
      if (slide.id === 0) {
        await slidesApi.createSlide(slide)
      } else {
        await slidesApi.updateSlide(slide.id, slide)
      }
      setIsModalOpen(false)
      await refreshSlides()
    } catch (error) {
      console.error('Error saving slide:', error)
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
        <div className="admin-slides">
          <div className="admin-header">
            <h1>Управление слайдами</h1>
            <button className="btn btn-primary" onClick={handleCreate}>
              + Добавить слайд
            </button>
          </div>

          <div className="slides-list">
            {slides.map((slide) => (
              <div key={slide.id} className="slide-item">
                <img src={slide.image} alt={slide.title} className="slide-preview" />
                <div className="slide-info">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
                <div className="slide-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(slide)}>
                    Редактировать
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(slide.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && editingSlide && (
        <SlideModal
          slide={editingSlide}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

interface SlideModalProps {
  slide: Slide
  onSave: (slide: Slide) => void
  onClose: () => void
}

const SlideModal = ({ slide, onSave, onClose }: SlideModalProps) => {
  const [formData, setFormData] = useState(slide)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{slide.id === 0 ? 'Новый слайд' : 'Редактировать слайд'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Изображение (URL или base64):</label>
            <textarea
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>Заголовок:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
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

export default AdminSlides
