import { PackageIcon, PencilIcon, TrashIcon } from '../../../../components/Icons/icons'
import type { Category, Product } from '../../../../types'

const AdminTable = ({
  products,
  categories,
  onEdit,
  onDelete
}: {
  products: Product[]
  categories: Category[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}) => {
  const getCategoryName = (slug: string) => {
    const category = categories.find((item) => item.path.split('/').pop() === slug)
    return category?.name ?? slug
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><PackageIcon size={46} /></div>
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
            <th>В наличии</th>
            <th>Категория</th>
            <th>Бейдж</th>
            <th>Метки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const stock = product.stock ?? 0
            return (
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
                    <div className="product-thumbnail placeholder">L</div>
                  )}
                </td>
                <td className="id-cell">{product.id}</td>
                <td className="name-cell">{product.name}</td>
                <td className="price-cell">{Number(product.price).toLocaleString('ru-RU')} с.</td>
                <td>
                  <span className={`stock-cell ${stock <= 0 ? 'out' : stock <= 3 ? 'low' : ''}`}>
                    {stock} шт.
                  </span>
                </td>
                <td>
                  <span className="category-badge">{getCategoryName(product.category)}</span>
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
                    <PencilIcon size={17} />
                  </button>
                  <button className="action-btn delete" onClick={() => onDelete(product.id)} title="Удалить">
                    <TrashIcon size={17} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable
