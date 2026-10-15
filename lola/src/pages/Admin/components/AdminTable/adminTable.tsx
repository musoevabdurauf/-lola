interface Product {
  id: string
  name: string
  price: number
  category: string
  badge: string
}

const AdminTable = ({
  products,
  onEdit,
  onDelete
}: {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}) => {
  return (
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
                <button className="action-btn edit" onClick={() => onEdit(product)}>
                  ✏️
                </button>
                <button className="action-btn delete" onClick={() => onDelete(product.id)}>
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
