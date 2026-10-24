import type { Product } from '../../../../types'

const AdminTable = ({
  products,
  onEdit,
  onDelete
}: {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <p className="empty-text">Продукты не найдены</p>
      </div>
    )
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Бейдж</th>
            <th>Метки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-thumbnail"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="product-thumbnail placeholder">🌸</div>
                )}
              </td>
              <td className="id-cell">{product.id}</td>
              <td className="name-cell">{product.name}</td>
              <td className="price-cell">{product.price.toLocaleString('ru-RU')} с.</td>
              <td>
                <span className="category-badge">{product.category}</span>
              </td>
              <td>{product.badge || '-'}</td>
              <td>
                <div className="tags-container">
                  {product.isNew && <span className="tag tag-new">Новинка</span>}
                  {product.isHit && <span className="tag tag-hit">Хит</span>}
                  {!product.isNew && !product.isHit && <span className="tag-none">-</span>}
                </div>
              </td>
              <td>
                <button className="action-btn edit" onClick={() => onEdit(product)} title="Редактировать">
                  ✏️
                </button>
                <button className="action-btn delete" onClick={() => onDelete(product.id)} title="Удалить">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
