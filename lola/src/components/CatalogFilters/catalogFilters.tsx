import './catalogFilters.css'

interface Category {
  id: string
  name: string
}

interface SortOption {
  id: string
  name: string
}

interface CatalogFiltersProps {
  category: string
  setCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
}

const CatalogFilters = ({ category, setCategory, sortBy, setSortBy }: CatalogFiltersProps) => {
  const categories: Category[] = [
    { id: 'all', name: 'Все' },
    { id: 'bukety', name: 'Букеты' },
    { id: 'rozy', name: 'Розы' },
    { id: 'tulpany', name: 'Тюльпаны' },
    { id: 'kompozitsii', name: 'Композиции' },
    { id: 'korziny', name: 'Корзины' },
    { id: 'svadebnye', name: 'Свадебные' },
  ]

  const sortOptions: SortOption[] = [
    { id: 'popular', name: 'По популярности' },
    { id: 'price-asc', name: 'Сначала дешевле' },
    { id: 'price-desc', name: 'Сначала дороже' },
    { id: 'new', name: 'Сначала новинки' },
  ]

  return (
    <aside className="catalog-filters">
      <div className="filter-section">
        <h3 className="filter-title">Категории</h3>
        <div className="filter-options">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-option ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Сортировка</h3>
        <div className="filter-options">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              className={`filter-option ${sortBy === option.id ? 'active' : ''}`}
              onClick={() => setSortBy(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Цена</h3>
        <div className="price-filter">
          <input type="number" placeholder="От" className="price-input" />
          <span className="price-separator">—</span>
          <input type="number" placeholder="До" className="price-input" />
        </div>
        <button className="apply-filter-btn">Применить</button>
      </div>
    </aside>
  )
}

export default CatalogFilters
