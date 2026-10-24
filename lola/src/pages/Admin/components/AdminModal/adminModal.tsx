import type { Product } from '../../../../types'

const AdminModal = ({
  isOpen,
  editingProduct,
  formData,
  onClose,
  onSubmit,
  onChange
}: {
  isOpen: boolean
  editingProduct: Product | null
  formData: Partial<Product>
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {editingProduct ? 'Редактировать продукт' : 'Добавить продукт'}
        </h2>
        <form className="modal-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Цена</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Категория</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
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
              onChange={onChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={onChange}
              />
              Новинка
            </label>
            <label>
              <input
                type="checkbox"
                name="isHit"
                checked={formData.isHit}
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
              value={formData.composition}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Высота</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Уход</label>
            <input
              type="text"
              name="care"
              value={formData.care}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Ссылка на изображение (URL)</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
            />
            <small style={{ color: '#666', fontSize: '0.85rem' }}>
              Вставьте ссылку на изображение (рекомендуются легкие изображения)
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
