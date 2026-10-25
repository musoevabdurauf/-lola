import { PlusIcon } from '../../../../components/Icons/icons'

const AdminHeader = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div className="admin-header">
      <h1 className="admin-title">Админ панель</h1>
      <div className="admin-header-actions">
        <button className="admin-button" onClick={onCreate}>
          <PlusIcon size={18} />
          Добавить продукт
        </button>
      </div>
    </div>
  )
}

export default AdminHeader
