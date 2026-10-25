import { BanknoteIcon, FlameIcon, PackageIcon, SparklesIcon } from '../../../../components/Icons/icons'
import type { Product } from '../../../../types'

const AdminStats = ({ products }: { products: Product[] }) => {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0)
  const newProducts = products.filter(p => p.isNew).length
  const hitProducts = products.filter(p => p.isHit).length

  const stats = [
    {
      label: 'Всего продуктов',
      value: totalProducts,
      icon: <PackageIcon size={24} />,
      color: '#FF6B9D'
    },
    {
      label: 'Общая стоимость',
      value: `${totalValue.toLocaleString('ru-RU')} с.`,
      icon: <BanknoteIcon size={24} />,
      color: '#C44569'
    },
    {
      label: 'Новинки',
      value: newProducts,
      icon: <SparklesIcon size={24} />,
      color: '#6BCB77'
    },
    {
      label: 'Хиты продаж',
      value: hitProducts,
      icon: <FlameIcon size={24} />,
      color: '#FFA500'
    }
  ]

  return (
    <div className="admin-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
          <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-info">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminStats
