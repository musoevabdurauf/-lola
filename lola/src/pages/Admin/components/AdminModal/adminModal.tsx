import { XIcon } from '../../../../components/Icons/icons'
import type { Category, Product } from '../../../../types'

const AdminModal = ({
  isOpen,
  editingProduct,
  formData,
  categories,
  onClose,
  onSubmit,
  onChange
}: {
  isOpen: boolean
  editingProduct: Product | null
  formData: Partial<Product>
  categories: Category[]
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-heading">
          <h2 className="modal-title">
            {editingProduct ? 'Редактировать продукт' : 'Добавить продукт'}
          </h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Закрыть">
            <XIcon size={18} />
          </button>
        </div>
        <form className="modal-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Цена, сомони</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price ?? 0}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>В наличии, шт.</label>
              <input
                type="number"
                name="stock"
                min="0"
                step="1"
                value={formData.stock ?? 0}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              name="name"
              value={formData.name ?? ''}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description ?? ''}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select
              name="category"
              value={formData.category ?? ''}
              onChange={onChange}
            >
              {categories.map((category) => {
                const slug = category.path.split('/').pop() ?? String(category.id)
                return (
                  <option key={category.id} value={slug}>{category.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Бейдж</label>
            <input
              type="text"
              name="badge"
              value={formData.badge ?? ''}
              onChange={onChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew ?? false}
                onChange={onChange}
              />
              Новинка
            </label>
            <label>
              <input
                type="checkbox"
                name="isHit"
                checked={formData.isHit ?? false}
                onChange={onChange}
              />
              Хит продаж
            </label>
          </div>
          <div className="form-group">
            <label>Состав</label>
            <input
              type="text"
              name="composition"
              value={formData.composition ?? ''}
              onChange={onChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Высота</label>
              <input
                type="text"
                name="height"
                value={formData.height ?? ''}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Уход</label>
              <input
                type="text"
                name="care"
                value={formData.care ?? ''}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Ссылка на изображение (URL)</label>
            <input
              type="url"
              name="image"
              value={formData.image ?? ''}
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
            />
            <small className="form-hint">
              Вставьте ссылку на изображение (рекомендуются лёгкие изображения)
            </small>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit">
              {editingProduct ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminModal
